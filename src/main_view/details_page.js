import { Async } from "../utils/async.js";
import { Enum } from "../utils/enum.js";
import { IconHelper } from "../utils/icon_helper.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Signal } from "../utils/signal.js";
import { add_error_toast, add_toast } from "../utils/helper_funcs.js";

const { GObject, GLib, Adw } = imports.gi;

export const DetailsPage = GObject.registerClass(
	{
		GTypeName: "DetailsPage",
		Template:
			"resource:///io/github/flattool/Ignition/main_view/details-page.ui",
		InternalChildren: [
			'header_bar',
				"trash_button",
				"save_button",
				"create_button",
			"root_banner",
				'scrolled_window',
					"content_box",
						"icon",
						"title_group",
						"enabled_row",
						"name_row",
						"comment_row",
						"exec_row",
							"path_info_button",
						"terminal_row",
			"path_info_popover",
			"override_dialog",
			"trash_dialog",
		],
	},
	class DetailsPage extends Adw.NavigationPage {
		static Origins = class Origin extends Enum {
			static HOST_APP = new Origin("host_app");
			static ROOT = new Origin("root");
			static HOME = new Origin("home");
			static NEW = new Origin("new");
			static DEFAULT = Origin.NEW;
		};

		entry = null; // Autostart Entry
		are_details_valid = true;
		origin = DetailsPage.Origins.DEFAULT;
		details_on_disks = new Map();
		gui_details = new Map();

		signals = {
			pop_request: new Signal(),
		};

		get is_saving_allowed() {
			return (
				this.origin === DetailsPage.Origins.HOME
				&& this.entry.file.query_exists(null)
			);
		}
		get is_trashing_allowed() {
			return this.is_saving_allowed
		}
		get is_creating_allowed() {
			return (
				this.origin === DetailsPage.Origins.HOST_APP
				|| this.origin === DetailsPage.Origins.NEW
			) && !this.entry.file.query_exists(null);
		}
		get is_overriding_allowed() {
			return (
				this.origin === DetailsPage.Origins.ROOT
				&& !this.entry.file.query_exists(null)
			);
		}

		constructor() {
			super(...arguments);

			// Connections
			this._enabled_row.connect('notify::active', () => this.set_details('enabled', this._enabled_row.active));
			this._name_row.connect('changed', () => {
				this.validate_input();
				this.set_details('name', this._name_row.text);
			});
			this._comment_row.connect('changed', () => {
				this.validate_input();
				this.set_details('comment', this._comment_row.text);
			});
			this._exec_row.connect('changed', () => {
				this.validate_input();
				this.set_details('exec', this._exec_row.text);
			});
			this._terminal_row.connect('notify::active', () => this.set_details('terminal', this._terminal_row.active));

			this._save_button.connect('clicked', () => this.on_save());
			this._create_button.connect('clicked', () => this.on_create());
			this._root_banner.connect('button-clicked', () => this.is_overriding_allowed && this.on_override());
			this._trash_button.connect('clicked', () => this.is_trashing_allowed && this.on_trash());

			this._override_dialog.connect('response', this.on_override_dialog_response.bind(this));
			this._trash_dialog.connect('response', this.on_trash_dialog_response.bind(this));

			this._scrolled_window.get_vadjustment().connect(
				'value-changed',
				adj => this._header_bar.show_title = adj.value > 0,
			);
		}

		load_details(entry, origin) {
			this.entry = entry;
			this.origin = origin;

			this.details_on_disks = new Map([
				['enabled', this.entry.enabled],
				['exec', this.entry.exec],
				['terminal', this.entry.terminal],
			]);
			this.details_on_disks.set('name', (
				origin === DetailsPage.Origins.NEW
				? _("New Entry")
				: this.entry.name || _("No Name Set")
			));
			this.details_on_disks.set('comment', (
				origin === DetailsPage.Origins.NEW
				? ""
				: this.entry.comment || _("No comment set.")
			));

			if (origin === DetailsPage.Origins.HOST_APP || origin === DetailsPage.Origins.ROOT) {
				entry.path = `${SharedVars.home_autostart_dir.get_path()}/${entry.file_name}`;
			} else if (origin === DetailsPage.Origins.NEW) {
				entry.path = `${SharedVars.home_autostart_dir.get_path()}/${Date.now()}.desktop`;
			}

			this.sync_details_to_ui();
			this.update_action_buttons();
		}

		validate_input() {
			const name = this._name_row.text;
			const exec = this._exec_row.text;
			const file_name_regex = /^(?! )[^\0\/"'.\\]+(?: [^\0\/"'.\\]+)*(?<! )$/;

			let validicty = true;

			if (name.length < 0 || !file_name_regex.test(name)) {
				this._name_row.add_css_class('error');
				validicty = false;
			} else {
				this._name_row.remove_css_class('error');
			}

			if (exec.length < 1) {
				this._exec_row.add_css_class('error');
				validicty = false;
			} else {
				this._exec_row.remove_css_class('error');
			}

			this.are_details_valid = validicty;
		}

		sync_details_to_ui() {
			Async.run(() => IconHelper.set_icon(this._icon, this.entry.icon));

			this.gui_details = new Map(this.details_on_disks);

			this._enabled_row.active = this.gui_details.get('enabled') ?? true;
			this._name_row.text = this.gui_details.get('name') ?? _("No Name Set");
			this._comment_row.text = this.gui_details.get('comment') ?? _("No comment set.");
			this._exec_row.text = this.gui_details.get('exec') ?? "";
			this._terminal_row.active = this.gui_details.get('terminal') ?? false;

			this._title_group.title = GLib.markup_escape_text(this.gui_details.get('name') ?? _("No Name Set"), -1);
		}

		sync_details_to_file() {
			this.entry.enabled = this.gui_details.get('enabled');
			this.entry.name = this.gui_details.get('name');
			this.entry.comment = this.gui_details.get('comment');
			this.entry.exec = this.gui_details.get('exec');
			this.entry.terminal = this.gui_details.get('terminal');
		}

		update_action_buttons() {
			this._save_button.visible = this.is_saving_allowed;
			this._save_button.sensitive = this.is_saving_allowed && this.are_details_valid && this.is_edited();
			this._create_button.visible = this.is_creating_allowed;
			this._create_button.sensitive = this.is_creating_allowed && this.are_details_valid;
			this._trash_button.visible = this.is_trashing_allowed;
			this._trash_button.sensitive = this.is_trashing_allowed;
			this._root_banner.revealed = this.origin === DetailsPage.Origins.ROOT;
			this._content_box.sensitive = this.origin !== DetailsPage.Origins.ROOT;
		}

		set_details(key, value) {
			this.gui_details.set(key, value);

			this._save_button.sensitive = (
				this.are_details_valid
				&& this.is_saving_allowed
				&& this.is_edited()
			);
			this._create_button.sensitive = (
				this.are_details_valid
				&& this.is_creating_allowed
			);
		}

		is_edited() {
			for (let [key, val] of this.details_on_disks) {
				if (this.gui_details.get(key) !== val) {
					return true;
				}
			}
			return false;
		}

		on_save() {
			if (!this.is_saving_allowed) {
				return;
			}
			this.sync_details_to_file();
			this.entry.save((file, err) => {
				if (err === null) {
					add_toast(_("Saved details"));
				} else {
					add_error_toast(_("Could not save file"), err);
				}
				this.signals.pop_request.emit();
			});
		}

		on_create() {
			if (!this.is_creating_allowed) {
				return;
			}
			this.sync_details_to_file();
			this.entry.save((file, err) => {
				if (err === null) {
					add_toast(_("Created entry"));
				} else {
					add_error_toast(_("Could not create file"), err);
				}
				this.signals.pop_request.emit();
			});
		}

		on_override() {
			if (!this.is_overriding_allowed) {
				return;
			}
			this._override_dialog.present(SharedVars.main_window);
			this._override_dialog.grab_focus();
		}

		on_override_dialog_response(dialog, response) {
			if (!this.is_overriding_allowed || response !== 'override_continue') {
				return;
			}
			this.sync_details_to_file();
			this.entry.save((file, err) => {
				if (err === null) {
					add_toast(_("Overrode entry"));
				} else {
					add_error_toast(_("Could not create file"), err);
				}
				this.signals.pop_request.emit();
			});
		}

		on_trash() {
			if (!this.is_trashing_allowed) {
				return;
			}
			this._trash_dialog.present(SharedVars.main_window);
			this._trash_dialog.grab_focus();
		}

		on_trash_dialog_response(dialog, response) {
			if (!this.is_trashing_allowed || response !== 'trash_continue') {
				return;
			}
			this.entry.trash((file, err) => {
				if (err === null) {
					add_toast(_("Trashed entry"));
				} else {
					add_error_toast(_("Could not trash file", err));
				}
				this.signals.pop_request.emit();
			});
		}
	},
);
