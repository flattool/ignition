const { GObject, GLib, Adw } = imports.gi;
import { IconHelper } from '../utils/icon_helper.js';
import { Async } from '../utils/async.js';
import { AutostartEntry } from '../utils/autostart_entry.js';

export const EntryRow = GObject.registerClass({
	GTypeName: 'EntryRow',
	Template: 'resource:///io/github/flattool/Ignition/gtk/entry-row.ui',
	InternalChildren: [
		"prefix_icon",
		"suffix_label",
		"info_button",
		"suffix_icon",
		"info_popover",
			"info_label",
	],
}, class EntryRow extends Adw.ActionRow {
	entry; // Autostart Entry
	sort_last = false;

	constructor(entry, show_suffix_label, ...args) {
		super(...args);

		entry.signals.file_saved.connect(this.load_details.bind(this));
		this.entry = entry;
		this._suffix_label.visible = show_suffix_label;
		this.load_details(entry);
	}

	load_details(entry) {
		this.entry = entry;
		const icon_key = entry.icon

		// This handles desktop entries that set their icon from a path
		//   Snap applications do this, so it's quite needed
		Async.run(() => {
			IconHelper.set_icon(this._prefix_icon, icon_key);
			return Async.BREAK;
		});

		this.title = GLib.markup_escape_text(entry.name || _("No Name Set"), -1);
		this.subtitle = GLib.markup_escape_text(entry.comment || _("No comment set."), -1);

		this.update_suffix();
		this.update_info();
	}

	update_suffix() {
		if (!this.entry.enabled) {
			this._suffix_label.label = _("Disabled");
			this.make_row_dim(true);
			this.sort_last = true;
		} else if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDDEN) {
			this._suffix_label.label = _("Overridden");
			this.make_row_dim(true);
			this.sort_last = true;
		} else {
			this._suffix_label.label = _("Enabled");
			this.make_row_dim(false);
			this.sort_last = false;
		}
	}

	make_row_dim(should_dim) {
		if (should_dim) {
			this._suffix_label.add_css_class('warning');
			this._prefix_icon.opacity = 0.4;
		} else {
			this._suffix_label.remove_css_class('warning');
			this._prefix_icon.opacity = 1;
		}
	}

	update_info() {
		this._info_button.visible = this.entry.overridden !== AutostartEntry.Overrides.NONE;
		if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDDEN) {
			this._info_label.label = _("This entry is overridden by a user entry.");
		} else if (this.entry.overridden === AutostartEntry.Overrides.OVERIDES) {
			this._info_label.label = _("This entry overrides a system entry.");
		}
	}
});
