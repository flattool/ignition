import GObject from 'gi://GObject';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import { IconUtils } from './utils.js';

export const EntryRow = GObject.registerClass({
	GTypeName: 'EntryRow',
	Template: 'resource:///io/github/flattool/Ignition/gtk/entry-row.ui',
	InternalChildren: [
		"prefix_icon",
		"enabled_label",
		"suffix_icon",
	],
}, class EntryRow extends Adw.ActionRow {
	load_details(entry) {
		this.entry = entry;
		const icon_key = entry.icon
		// This handles desktop entries that set their icon from a path
		//   Snap applications do this, so it's quite needed
		GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
			IconUtils.set_icon(this._prefix_icon, icon_key)
			return GLib.SOURCE_REMOVE;
		})

		this.title = GLib.markup_escape_text(entry.name || _("No Name Set"), -1);
		this.subtitle = GLib.markup_escape_text(entry.comment || _("No comment set."), -1);
		if (entry.enabled) {
			this._enabled_label.label = _("Enabled");
			this._enabled_label.remove_css_class("warning");
			this._prefix_icon.opacity = 1;
		} else {
			this._enabled_label.label = _("Disabled");
			this._enabled_label.add_css_class("warning");
			this._prefix_icon.opacity = 0.4;
		}
	}

	entry; // Autostart Entry

	constructor(entry, show_enabled_label, ...args) {
		super(...args);

		entry.signals.file_saved.connect(this.load_details.bind(this));
		this.entry = entry;
		this._enabled_label.visible = show_enabled_label;
		this.load_details(entry)
	}
});
