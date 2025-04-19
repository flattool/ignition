const { GObject, GLib, Gio, Adw } = imports.gi;
import { Signal } from "../utils/signal.js";
import { SharedVars } from "../utils/shared_vars.js";
import { KeyFileHelper } from "../utils/key_file_helper.js";
import { Async } from "../utils/async.js";
import { IconHelper } from "../utils/icon_helper.js";
import { Enum } from "../utils/enum.js";

export const DetailsPage = GObject.registerClass({
	GTypeName: "DetailsPage",
	Template: "resource:///io/github/flattool/Ignition/main_view/details-page.ui",
	InternalChildren: [
		'trash_button',
		'save_button',
		'root_banner',
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

	constructor() {
		super(...arguments);
	}

	load_details(entry, origin) {
		if (entry === this.entry) {
			return;
		}
		this.entry = entry;
		this.origin = origin;

		this.update_root_state();

		Async.run(() => IconHelper.set_icon(this._icon, this.entry.icon));
		this._title_group.title = GLib.markup_escape_text(entry.name || _("No Name Set"), -1);
		this._enabled_row.active = entry.enabled;
		this._name_row.text = GLib.markup_escape_text(entry.name || _("No Name Set"), -1);
		this._comment_row.text = GLib.markup_escape_text(entry.coment || _("No comment set."), -1);
		this._exec_row.text = entry.exec;
		this._terminal_row.active = entry.terminal;

		this._root_banner.connect('button-clicked', () => this._override_dialog.present(SharedVars.main_window));
	}

	update_root_state() {
		this._root_banner.revealed = this.origin === DetailsPage.Origins.ROOT;

		switch (this.origin) {
			case DetailsPage.Origins.HOST_APP: {
				print("host app!");
			} break;
			case DetailsPage.Origins.ROOT: {
				print("root!");
			} break;
			case DetailsPage.Origins.HOME: {
				print("home!");
			} break;
			case DetailsPage.Origins.NEW: {
				print("new!");
			} break;
		}
	}

	on_save() { }

	on_trash() { }
});
