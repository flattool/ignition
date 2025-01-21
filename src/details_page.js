import GObject from 'gi://GObject';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Gdk from 'gi://Gdk';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import { IconUtils, SharedVars, Signal } from './utils.js';
import { AutostartEntry } from './autostart_entry.js';
import { new_error_toast } from './error_toast.js';

export const DetailsPage = GObject.registerClass({
	GTypeName: 'DetailsPage',
	Template: 'resource:///io/github/flattool/Ignition/gtk/details-page.ui',
	InternalChildren: [
		"cancel_button",
		"apply_button",
		"icon",
		"title_group",
		"enabled_row",
		"list_box",
			"name_row",
			"comment_row",
			"exec_row",
				"path_info_button",
			"terminal_row",
		"action_group",
			"create_row",
			"trash_row",
	],
}, class DetailsPage extends Adw.NavigationPage {
	load_details(auto_entry, is_new_file) {
		const old_entry = this.auto_entry;
		if (is_new_file) {
			this.auto_entry = new AutostartEntry("");
		} else {
			this.auto_entry = auto_entry;
		}
		this.can_pop = is_new_file;

		if (auto_entry) {
			this.icon_key_holder = auto_entry.icon;
			IconUtils.set_icon(this._icon, auto_entry.icon);
			this._title_group.title = auto_entry.name || _("No Name Set");
			this._enabled_row.active = auto_entry.enabled;
			this._name_row.text = auto_entry.name;
			this._comment_row.text = auto_entry.comment;
			this._exec_row.text = auto_entry.exec;
			this._terminal_row.active = auto_entry.terminal;
		} else {
			this.icon_key_holder = "";
			this._icon.icon_name = "ignition:application-x-executable-symbolic";
			this._title_group.title = _("New Entry");
			this._enabled_row.active = true;
			this._name_row.text = "";
			this._comment_row.text = "";
			this._exec_row.text = "";
			this._terminal_row.active = false;
		}

		if (this.auto_entry) {
			this.auto_entry.signals.file_save_failed.connect(this.save_failed);
			this.auto_entry.signals.file_trash_failed.connect(this.trash_failed);
		}
		if (old_entry) {
			old_entry.signals.file_save_failed.disconnect(this.save_failed);
			old_entry.signals.file_trash_failed.disconnect(this.trash_failed);
		}
	}

	validate_row(row) {
		if (row.text.trim().length > 0) {
			row.remove_css_class("error");
			this.invalid_rows.delete(row);
		} else {
			row.add_css_class("error");
			this.invalid_rows.add(row);
		}
		this._apply_button.sensitive = this.invalid_rows.size === 0;
		this._create_row.sensitive = this.invalid_rows.size === 0;
	}

	on_apply() {
		if (!this._apply_button.sensitive) {
			return;
		}
		if (!this.auto_entry) {
			return;
		}
		this.auto_entry.icon = this.icon_key_holder;
		this.auto_entry.enabled = this._enabled_row.active;
		this.auto_entry.name = this._name_row.text.trim();
		this.auto_entry.comment = this._comment_row.text.trim();
		this.auto_entry.exec = this._exec_row.text.trim();
		this.auto_entry.terminal = this._terminal_row.active;
		this.auto_entry.save();
	}

	on_trash() {
		if (!this._trash_row.visible) {
			return;
		}
		if (!this._trash_row.sensitive) {
			return;
		}
		this.auto_entry.trash();
	}

	// These must be arrow functions for signal disconnect to work
	save_failed = (error) => this.signals.save_failed.emit(error);
	trash_failed = (error) => this.signals.trash_failed.emit(error);

	auto_entry;
	icon_key_holder = "";
	invalid_rows = new Set();
	signals = {
		cancel_pressed: new Signal(),
		save_failed: new Signal(),
		trash_failed: new Signal(),
	}

	constructor(...args) {
		super(...args);

		// Extra item creation
		const event_controller = new Gtk.EventControllerKey();

		// Connections
		this._cancel_button.connect("clicked", this.signals.cancel_pressed.emit.bind(this.signals.cancel_pressed, null));
		this._apply_button.connect("clicked", this.on_apply.bind(this));
		this._name_row.connect("changed", this.validate_row.bind(this));
		this._name_row.connect("entry-activated", this.on_apply.bind(this));
		this._comment_row.connect("entry-activated", this.on_apply.bind(this));
		this._exec_row.connect("changed", this.validate_row.bind(this));
		this._exec_row.connect("entry-activated", this.on_apply.bind(this));
		this._create_row.connect("activated", this.on_apply.bind(this));
		this._trash_row.connect("activated", this.on_trash.bind(this));
		// Allow pressing Escape to close the dialog, when we are
		//   presented as the first page, instead of a subpage
		event_controller.connect("key-pressed", (__, keyval) => {
			if (keyval === Gdk.KEY_Escape && !this.can_pop) {
				this.signals.cancel_pressed.emit(null);
			}
		});

		// Apply
		this.add_controller(event_controller);

	}
});
