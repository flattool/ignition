import { Async } from "../utils/async.js";
import { AutostartEntry } from "../utils/autostart_entry.js";
import { IconHelper } from "../utils/icon_helper.js";
import { SharedVars } from "../utils/shared_vars.js";

import GObject from "gi://GObject?version=2.0";
import GLib from "gi://GLib?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";

export class EntryRow extends Adw.ActionRow {
	static {
		GObject.registerClass({
			GTypeName: "EntryRow",
			Template: "resource:///io/github/flattool/Ignition/gtk/entry-row.ui",
			InternalChildren: [
				"prefix_icon",
				"suffix_label",
				"info_button",
				"suffix_icon",
				"info_popover",
					"info_label",
			],
		}, this);
	}

	readonly _prefix_icon!: Gtk.Image;
	readonly _suffix_label!: Gtk.Label;
	readonly _info_button!: Gtk.MenuButton;
	readonly _suffix_icon!: Gtk.Image;
	readonly _info_popover!: Gtk.Popover;
	readonly _info_label!: Gtk.Label;

	entry: AutostartEntry;
	sort_priority = 0;

	constructor(entry: AutostartEntry, show_suffix_label: boolean, params?: Adw.ActionRow.ConstructorProps) {
		super(params);

		this.entry = entry;
		this._suffix_label.visible = show_suffix_label;
		this.load_details(entry, show_suffix_label);
	}

	load_details(entry: AutostartEntry, should_update_suffix_and_info: boolean): void {
		this.entry = entry;
		const icon_key = entry.icon

		// This handles desktop entries that set their icon from a path
		//   Snap applications do this, so it"s quite needed
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

	update_suffix(): void {
		if (!this.entry.enabled) {
			this._suffix_label.label = _("Disabled");
			this.make_row_dim(true);
			this.sort_priority = 1; // sort middle
		} else if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDDEN) {
			this._suffix_label.label = _("Overridden");
			this.make_row_dim(true);
			this.sort_priority = 0; // sort last
		} else {
			const delay = this.entry.delay;
			if (delay > 0) {
				// Translators: %d is the number of seconds of delay before the app starts
				this._suffix_label.label = _("Enabled after %d s").replace("%d", delay.toString());
			} else {
				this._suffix_label.label = _("Enabled");
			}
			this.make_row_dim(false);
			this.sort_priority = 2; // sort first
		}
	}

	make_row_dim(should_dim: boolean): void {
		if (should_dim) {
			this._suffix_label.add_css_class("warning");
			this._prefix_icon.opacity = 0.4;
		} else {
			this._suffix_label.remove_css_class("warning");
			this._prefix_icon.opacity = 1;
		}
	}

	update_info(): void {
		this._info_button.visible = this.entry.overridden !== AutostartEntry.Overrides.NONE;
		this.activatable = this.entry.overridden !== AutostartEntry.Overrides.OVERRIDDEN;
		if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDDEN) {
			this._info_label.label = _("This entry is overridden by a user entry.");
		} else if (this.entry.overridden === AutostartEntry.Overrides.OVERRIDES) {
			this._info_label.label = _("This entry overrides a system entry.");
		}
	}
}
