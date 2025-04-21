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
			"trash_button",
			"create_button",
			"save_button",
			"root_banner",
			"content_box",
			"icon",
			"title_group",
			"enabled_row",
			"name_row",
			"comment_row",
			"exec_row",
			"path_info_button",
			"path_info_popover",
			"terminal_row",
			"override_dialog",
			"discard_dialog",
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

		get can_save() {
			return (
				this.origin === DetailsPage.Origins.HOME
				&& this.entry.file.query_exists(null)
			);
		}
		get can_trash() {
			return this.can_save
		}
		get can_create() {
			return (
				this.origin === DetailsPage.Origins.HOST_APP
				|| this.origin === DetailsPage.Origins.NEW
			) && !this.entry.file.query_exists(null);
		}
		get can_override() {
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
			this._exec_row.connect('changed', () => this.set_details('exec', this._exec_row.text));
			this._terminal_row.connect('notify::active', () => this.set_details('terminal', this._terminal_row.active));
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

			if (exec.length < 0) {
				this._exec_row.add_css_class('error');
				validicty = false;
			} else {
				this._exec_row.remove_css_class('error');
			}

			this.are_details_valid = validicty;
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

			if (origin === DetailsPage.Origins.HOST_APP) {
				entry.path = `${SharedVars.home_autostart_dir.path}/${entry.file_name}`;
			} else if (origin === DetailsPage.Origins.NEW) {
				entry.path = `${SharedVars.home_autostart_dir.path}/${Date.now()}.desktop`;
			}

			this.sync_details_to_ui();
			this.update_action_buttons();
		}

		sync_details_to_ui() {
			Async.run(() => IconHelper.set_icon(this._icon, this.entry.icon));

			this.gui_details = new Map(this.details_on_disks);

			this._enabled_row.active = this.gui_details.get('enabled') ?? true;
			this._name_row.text = this.gui_details.get('name') ?? _("No Name Set");
			this._comment_row.text = this.gui_details.get('comment') ?? _("No comment set.");
			this._exec_row.text = this.gui_details.get('exec') ?? "";
			this._terminal_row.active = this.gui_details.get('terminal') ?? false;

			this._title_group.title = this.gui_details.get('name') ?? _("No Name Set");
		}

		update_action_buttons() {
			this._save_button.visible = this.can_save;
			this._save_button.sensitive = false;
			this._create_button.visible = this.can_create;
			this._create_button.sensitive = this.can_create;
			this._trash_button.visible = this.can_trash;
			this._trash_button.sensitive = this.can_trash;
			this._root_banner.revealed = this.origin === DetailsPage.Origins.ROOT;
			this._content_box.sensitive = this.origin !== DetailsPage.Origins.ROOT;
		}

		set_details(key, value) {
			this.gui_details.set(key, value);

			this._save_button.sensitive = (
				this.are_details_valid
				&& this.can_save
				&& this.is_edited()
			);
			this._create_button.sensitive = (
				this.are_details_valid
				&& this.can_create
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

		on_save() { }

		on_create() { }

		on_override() { }

		on_trash() { }
	},
);
