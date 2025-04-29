import { Async } from "../utils/async.js";
import { DelayHelper } from "../utils/delay_helper.js";
import { Enum } from "../utils/enum.js";
import { IconHelper } from "../utils/icon_helper.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Signal } from "../utils/signal.js";
import { add_error_toast, add_toast } from "../utils/helper_funcs.js";

const { GObject, GLib, Gio, Adw } = imports.gi;

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
						"delay_adjustment",
			"path_info_popover",
			"create_dialog",
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
		origin = DetailsPage.Origins.DEFAULT;
		details_on_disks = new Map();
		gui_details = new Map();

		signals = {
			pop_request: new Signal(),
		};

		invalid_rows = new Set();

		file_name_regex = /^(?! )[^\0\/"'.\\]+(?: [^\0\/"'.\\]+)*(?<! )$/;
		exec_regex = /^\S(?:.*\S)?$/;

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
			this._enabled_row.connect('notify::active', () => this.set_gui_detail('enabled', this._enabled_row.active));
			this._name_row.connect('changed', () => {
				const text = this._name_row.text;
				this.validate_input(this._name_row, text.length > 0 && this.file_name_regex.test(text));
				this.set_gui_detail('name', text);
			});
			this._comment_row.connect('changed', () => this.set_gui_detail('comment', this._comment_row.text));
			this._exec_row.connect('changed', () => {
				const text = this._exec_row.text;
				this.validate_input(this._exec_row, text.length > 0 && this.exec_regex.test(text));
				this.set_gui_detail('exec', text);
			});
			this._terminal_row.connect(
				'notify::active', () => this.set_gui_detail('terminal', this._terminal_row.active)
			);

			this._name_row.connect('entry-activated', () => {
				this.on_create();
				this.on_save();
			});
			this._comment_row.connect('entry-activated', () => {
				this.on_create();
				this.on_save();
			});
			this._exec_row.connect('entry-activated', () => {
				this.on_create();
				this.on_save();
			});

			this._save_button.connect('clicked', () => this.on_save());
			this._create_button.connect('clicked', () => this.on_create());
			this._root_banner.connect('button-clicked', () => this.on_override());
			this._trash_button.connect('clicked', () => this.on_trash());

			this._create_dialog.connect('response', this.on_create_dialog_response.bind(this));
			this._override_dialog.connect('response', this.on_override_dialog_response.bind(this));
			this._trash_dialog.connect('response', this.on_trash_dialog_response.bind(this));

			this._delay_adjustment.connect('value-changed', adj => this.set_gui_detail('delay', adj.value));

			const save_action = SharedVars.application.lookup_action('save-edits');
			if (save_action) save_action.connect('activate', () => {
				this.on_save();
				this.on_create();
			});
		}

		load_details(entry, origin) {
			this.entry = entry;
			this.origin = origin;

			const is_new = origin === DetailsPage.Origins.NEW;

			// Get the startup delay, if any
			const raw_exec = this.entry.exec;
			const [delay, display_exec, load_error] = (raw_exec.endsWith('.ignition_delay.sh')
				? DelayHelper.load_delay(Gio.File.new_for_path(raw_exec))
				: [0, raw_exec, null]
			);

			if (load_error) {
				print(load_error);
			}

			this.details_on_disks = new Map([
				['enabled', this.entry.enabled],
				['name', is_new ? "" : (this.entry.name || SharedVars.default_name)],
				['comment', this.entry.comment || ""],
				['exec', display_exec],
				['terminal', this.entry.terminal],
				['delay', delay],
			]);

			if (origin === DetailsPage.Origins.HOST_APP || origin === DetailsPage.Origins.ROOT) {
				entry.path = `${SharedVars.home_autostart_dir.get_path()}/${entry.file_name}`;
			}

			this._save_button.visible = this.is_saving_allowed;
			this._create_button.visible = this.is_creating_allowed;
			this._root_banner.revealed = this.is_overriding_allowed;
			this._trash_button.visible = this.is_trashing_allowed;

			this.sync_details_to_ui();
		}

		validate_input(row, test) {
			if (test) {
				row.remove_css_class('error');
				this.invalid_rows.delete(row);
			} else {
				row.add_css_class('error');
				this.invalid_rows.add(row);
			}
		}

		sync_details_to_ui() {
			Async.run(() => IconHelper.set_icon(this._icon, this.entry.icon));

			this.gui_details = new Map(this.details_on_disks);

			this._enabled_row.active = this.gui_details.get('enabled') ?? true;
			this._name_row.text = this.gui_details.get('name') ?? "";
			this._comment_row.text = this.gui_details.get('comment') ?? "";
			this._exec_row.text = this.gui_details.get('exec') ?? "";
			this._terminal_row.active = this.gui_details.get('terminal') ?? false;
			this._delay_adjustment.value = this.gui_details.get('delay') ?? 0;

			this._title_group.title = (this.origin === DetailsPage.Origins.NEW
				? _("New Entry")
				: GLib.markup_escape_text(this.gui_details.get('name') || SharedVars.default_name, -1)
			);
		}

		set_gui_detail(key, value) {
			this.gui_details.set(key, value);

			this._save_button.sensitive = (
				this.invalid_rows.size == 0
				&& this.is_saving_allowed
				&& this.is_edited()
			);
			this._create_button.sensitive = (
				this.invalid_rows.size == 0
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

		sync_details_to_entry() {
			this.entry.enabled = this.gui_details.get('enabled');
			this.entry.name = this.gui_details.get('name');
			this.entry.comment = this.gui_details.get('comment');
			this.entry.terminal = this.gui_details.get('terminal');

			if (this.origin === DetailsPage.Origins.NEW) {
				this.entry.path = `${SharedVars.home_autostart_dir.get_path()}/${this.gui_details.get('name')}.desktop`;
			}

			// Setting the exec value with its sleep delay, if any
			const delay = this.gui_details.get('delay');
			const raw_exec = this.gui_details.get('exec');

			const delay_name = this.entry.file_name.replace(".desktop", ".ignition_delay.sh");
			const delay_path = `${SharedVars.home_autostart_dir.get_path()}/${delay_name}`;
			const delay_file = Gio.File.new_for_path(delay_path);

			let final_exec = raw_exec;

			if (delay > 0) {
				const delay_error = DelayHelper.save_delay(delay_file, delay, raw_exec);
				if (delay_error) {
					print(delay_error);
				} else {
					final_exec = delay_path;
				}
			} else if (
				delay_file.query_exists(null)
				&& delay_file.query_file_type(
					Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
					null,
				) === Gio.FileType.REGULAR
			) {
				try {
					delay_file.trash(null);
				} catch (error) {
					print(`failed to trash delay file at path: ${delay_path}`);
				}
			}

			this.entry.exec = final_exec;
		}

		on_save() {
			if (!this.is_saving_allowed || !this._save_button.sensitive) {
				return;
			}
			this.sync_details_to_entry();
			this.entry.save((file, err) => {
				if (err === null) {
					add_toast(_("Saved details"));
				} else {
					add_error_toast(_("Could not save file"), `${err}`);
				}
				this.signals.pop_request.emit();
			});
		}

		on_create() {
			if (!this.is_creating_allowed || !this._create_button.sensitive) {
				return;
			}
			this.sync_details_to_entry();
			if (this.entry.file.query_exists(null)) {
				this._create_dialog.present(SharedVars.main_window);
				this._create_dialog.grab_focus();
			} else {
				this.on_create_dialog_response(null, 'create_continue');
			}
		}

		on_create_dialog_response(dialog, response) {
			if (!this.is_creating_allowed || response !== 'create_continue') {
				return;
			}
			this.entry.save((file, err) => {
				if (err === null) {
					add_toast(_("Created entry"));
				} else {
					add_error_toast(_("Could not create file"), `${err}`);
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
			this.sync_details_to_entry();
			this.entry.save((file, err) => {
				if (err === null) {
					add_toast(_("Overrode entry"));
					this.load_details(this.entry, DetailsPage.Origins.HOME);
				} else {
					add_error_toast(_("Could not create file"), `${err}`);
				}
			});
		}

		on_trash() {
			if (!this.is_trashing_allowed || !this._trash_button.sensitive) {
				return;
			}
			this._trash_dialog.present(SharedVars.main_window);
			this._trash_dialog.grab_focus();
		}

		on_trash_dialog_response(dialog, response) {
			if (!this.is_trashing_allowed || response !== 'trash_continue') {
				return;
			}

			// Trash delay file, if any
			const delay_name = this.entry.file_name.replace(".desktop", ".ignition_delay.sh");
			const delay_path = `${SharedVars.home_autostart_dir.get_path()}/${delay_name || Date.now()}`;
			const delay_file = Gio.File.new_for_path(delay_path);
			if (
				delay_file.query_exists(null)
				&& delay_file.query_file_type(
					Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
					null,
				) === Gio.FileType.REGULAR
			) {
				try {
					delay_file.trash(null);
				} catch (error) {
					print(error);
				}
			}

			this.entry.trash((file, err) => {
				if (err === null) {
					add_toast(_("Trashed entry"));
				} else {
					add_error_toast(_("Could not trash file", `${err}`));
				}
				this.signals.pop_request.emit();
			});
		}
	},
);
