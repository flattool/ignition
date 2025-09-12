import Adw from "gi://Adw?version=1"
import type Gtk from "gi://Gtk?version=4.0"
import GLib from "gi://GLib?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { Entry } from "../utils/entry.js"
import { set_icon } from "../utils/icon_helpers.js"

export namespace EntryRow {
	export interface ConstructorProps {
		entry: Entry
		show_suffix_label?: boolean
	}
}

@GObjectify.Class({ template: "/io/github/flattool/Ignition/gtk/entry_row", ready })
export class EntryRow extends Adw.ActionRow {
	@GObjectify.Child
	public accessor prefix_icon!: Gtk.Image

	@GObjectify.Property(Entry, { flags: "CONSTRUCT_ONLY" })
	public accessor entry!: Entry

	@GObjectify.Property("bool", { default: true })
	public accessor show_suffix_label!: boolean

	public constructor(params: EntryRow.ConstructorProps) {
		// @ts-expect-error: params has nothing in common with Adw.ActionRow.ConstructorProps,
		//   but we need to pass our own properties to super
		super(params)
	}

	protected _escape_text(__: this, text: string): string {
		return GLib.markup_escape_text(text, -1)
	}

	protected _get_prefix_icon_opacity(): number {
		return this.entry.override_state === "overridden" || !this.entry.enabled ? 0.4 : 1
	}

	protected _get_suffix_text(__: this, entry_enabled: boolean, override_state: Entry.OveriddenState): string {
		if (override_state === "overridden") return _("Overridden")
		return entry_enabled ? _("Enabled") : _("Disabled")
	}

	protected _get_more_menu_visibility(): boolean {
		return this.entry.override_state !== "none"
	}

	protected _get_more_menu_text(entry_override_state: Entry.OveriddenState): string {
		switch (entry_override_state) {
			case "overridden": return _("This entry is overridden by a user entry")
			case "overrides": return _("This entry overrides a system entry.")
		}
		return ""
	}
}

function ready(this: EntryRow): void {
	set_icon(this.prefix_icon, this.entry.icon)
}
