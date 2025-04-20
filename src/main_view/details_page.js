import { Async } from "../utils/async.js";
import { Enum } from "../utils/enum.js";
import { IconHelper } from "../utils/icon_helper.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Signal } from "../utils/signal.js";
import { add_error_toast, add_toast } from "../utils/helper_funcs.js";

const { GObject, GLib, Adw } = imports.gi;

export const DetailsPage = GObject.registerClass({
	GTypeName: "DetailsPage",
	Template: "resource:///io/github/flattool/Ignition/main_view/details-page.ui",
	InternalChildren: [
		'trash_button',
		'create_button',
		'save_button',
		'root_banner',
		'content_box',
		'icon',
		'title_group',
		'enabled_row',
		'name_row',
		'comment_row',
		'exec_row',
		'path_info_button',
		'path_info_popover',
		'terminal_row',
		'override_dialog',
		'discard_dialog',
		'trash_dialog',
	],
}, class DetailsPage extends Adw.NavigationPage {
	static Origins = class Origin extends Enum {
		static HOST_APP = new Origin('host_app');
		static ROOT = new Origin('root');
		static HOME = new Origin('home');
		static NEW = new Origin('new');
		static DEFAULT = Origin.NEW;
	};

	entry = null; // Autostart Entry
	origin = DetailsPage.Origins.DEFAULT;
	signals = {
		pop_request: new Signal(),
	};
	details_on_disks = {
		icon: "",
		enabled: true,
		name: "",
		comment: "",
		exec: "",
		terminal: false,
	};
	gui_details = {
		icon: "",
		enabled: true,
		name: "",
		comment: "",
		exec: "",
		terminal: false,
	};

	constructor() {
		super(...arguments);

		this._root_banner.connect('button-clicked', () => {
			this._override_dialog.present(SharedVars.main_window);
			this._override_dialog.grab_focus();
		});
		this._override_dialog.connect('response', this.on_override.bind(this));
		this._save_button.connect('clicked', () => this.on_save());
		this._trash_dialog.connect('response', this.on_trash.bind(this));
		this._trash_button.connect('clicked', () => {
			this._trash_dialog.present(SharedVars.main_window);
			this._trash_dialog.grab_focus();
		});
		this._create_button.connect('clicked', () => this.on_create());
	}

	load_details(entry, origin) {
		if (entry === this.entry) {
			return;
		}
		this.entry = entry;
		this.origin = origin;

		Async.run(() => IconHelper.set_icon(this._icon, this.entry.icon));
		this._title_group.title = GLib.markup_escape_text(entry.name || _("No Name Set"), -1);
		this._enabled_row.active = entry.enabled;
		this._name_row.text = GLib.markup_escape_text(entry.name || _("No Name Set"), -1);
		this._comment_row.text = GLib.markup_escape_text(entry.coment || _("No comment set."), -1);
		this._exec_row.text = entry.exec;
		this._terminal_row.active = entry.terminal;

		this._content_box.sensitive = origin !== DetailsPage.Origins.ROOT;
		this._root_banner.revealed = origin === DetailsPage.Origins.ROOT;
		this._save_button.visible = origin === DetailsPage.Origins.HOME;
		this._trash_button.visible = origin === DetailsPage.Origins.HOME;
		this._create_button.visible = origin === DetailsPage.Origins.NEW || origin === DetailsPage.Origins.HOST_APP;
	}

	on_save() {
		if (!this.entry.file.query_exists(null) || this.origin !== DetailsPage.Origins.HOME) {
			add_error_toast(
				_("Could not save file"),
				"details_page.on_save called with an empty file or incorrect origin",
			);
			return;
		}

		this.entry.save((__, err) => {
			if (err != null) {
				add_error_toast(
					_("Could not save file"),
					err,
				);
				return;
			}
			add_toast(_("Saved Details"));
			this.signals.pop_request.emit();
		});
	}

	on_create() {
		if (this.origin === DetailsPage.Origins.HOST_APP) {
			this.entry.path = `${SharedVars.home_autostart_dir.get_path()}/${this.entry.file_name}`;
		} else if (this.origin === DetailsPage.Origins.NEW) {
			this.entry.path = `${
				SharedVars.home_autostart_dir.get_path()
			}/${
				this._name_row.text || Date.now() // Handles the should-not-be-possible chance an empty name is saved
			}.desktop`;
		} else {
			add_error_toast(
				_("Could not create file"),
				"details_page.on_create called with an incorrect origin",
			);
			return;
		}

		this.entry.save((__, err) => {
			if (err != null) {
				add_error_toast(
					_("Could not create file"),
					err,
				);
				return;
			}
			add_toast(_("Created Entry"));
			this.signals.pop_request.emit();
		});
	}

	on_trash(dialog, response) {
		if (response !== 'trash_continue') {
			return;
		}

		if (!this.entry.file.query_exists(null) || this.origin !== DetailsPage.Origins.HOME) {
			add_error_toast(
				_("Could not trash file"),
				"details_page.on_trash called with an empty file or incorrect origin",
			);
			return;
		}

		this.entry.trash((__, err) => {
			if (err != null) {
				add_error_toast(
					_("Could not trash file"),
					err,
				);
				return;
			}
			add_toast(_("Trashed Entry"));
			this.signals.pop_request.emit();
		});
	}

	on_override(dialog, response) {
		if (response !== 'override_continue') {
			return;
		}

		if (this.origin !== DetailsPage.Origins.ROOT) {
			add_error_toast(
				_("Could not override file"),
				"details_page.on_override called with an incorrect origin",
			);
		}

		this.entry.path = `${SharedVars.home_autostart_dir.get_path()}/${this.entry.file_name}`;
		this.entry.save((__, err) => {
			if (err != null) {
				add_error_toast(
					_("Could not create file"),
					err,
				);
				return;
			}
			add_toast(_("Created Entry"));
			this.signals.pop_request.emit();
		});
	}
});
