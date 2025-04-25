import { Async } from '../utils/async.js';
import { AutostartEntry } from '../utils/autostart_entry.js';
import { IconHelper } from '../utils/icon_helper.js';
import { SharedVars } from '../utils/shared_vars.js';

const { GObject, GLib, Adw } = imports.gi;

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

	// Effects how rows are sorted in the UI. Higher number -> higher in the list
	//   Rows with equal priority are sorted by their names: lower-case-alphabetically
	sort_priority = 0;

	constructor(entry, show_suffix_label, ...args) {
		super(...args);

		this.entry = entry;
		this._suffix_label.visible = show_suffix_label;
		this.load_details(entry, show_suffix_label);
	}

	load_details(entry, should_update_suffix_and_info) {
		this.entry = entry;
		const icon_key = entry.icon

		// This handles desktop entries that set their icon from a path
		//   Snap applications do this, so it's quite needed
		Async.run(() => {
			IconHelper.set_icon(this._prefix_icon, icon_key);
			return Async.BREAK;
		});

		this.title = GLib.markup_escape_text(entry.name || SharedVars.default_name, -1);
		this.subtitle = GLib.markup_escape_text(entry.comment || SharedVars.default_comment, -1);

		if (should_update_suffix_and_info) {
			this.update_suffix();
			this.update_info();
		}
	}

	update_suffix() {
		if (!this.entry.enabled) {
			this._suffix_label.label = _("Disabled");
			this.make_row_dim(true);
			this.sort_priority = 1; // sort middle
		} else if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDDEN) {
			this._suffix_label.label = _("Overridden");
			this.make_row_dim(true);
			this.sort_priority = 0; // sort last
		} else {
			this._suffix_label.label = _("Enabled");
			this.make_row_dim(false);
			this.sort_priority = 2; // sort first
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
		this.activatable = this.entry.overridden !== AutostartEntry.Overrides.OVERRIDDEN;
		if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDDEN) {
			this._info_label.label = _("This entry is overridden by a user entry.");
		} else if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDES) {
			this._info_label.label = _("This entry overrides a system entry.");
		}
	}
});
