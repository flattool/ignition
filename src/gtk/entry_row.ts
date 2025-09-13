import Adw from "gi://Adw?version=1"
import type Gtk from "gi://Gtk?version=4.0"
import GLib from "gi://GLib?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { Entry } from "../utils/entry.js"
import { set_icon } from "../utils/icon_helpers.js"
import { css_switcher } from "../utils/css_switcher.js"

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

	@GObjectify.Child
	public accessor suffix_label!: Gtk.Label

	@GObjectify.Property(Entry, { flags: "CONSTRUCT_ONLY" })
	public accessor entry!: Entry

	@GObjectify.Property("bool", { default: true })
	public accessor show_suffix_label!: boolean

	private label_css_switch = css_switcher(this.suffix_label, "warning")

	public constructor(params: EntryRow.ConstructorProps) {
		// @ts-expect-error: params has nothing in common with Adw.ActionRow.ConstructorProps,
		//   but we need to pass our own properties to super
		super(params)
	}

	protected update_suffix_label_css(): void {
		this.label_css_switch(this.entry.override_state === "overridden" || !this.entry.enabled ? "warning" : "")
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

	protected _get_more_menu_text(__: this, entry_override_state: Entry.OveriddenState): string {
		if (entry_override_state === "overridden") return _("This entry is overridden by a user entry")
		if (entry_override_state === "overrides") return _("This entry overrides a system entry.")
		return ""
	}
}

function ready(this: EntryRow): void {
	set_icon(this.prefix_icon, this.entry.icon)
	this.update_suffix_label_css()

	this.entry.connect("notify::icon", () => set_icon(this.prefix_icon, this.entry.icon))
	this.entry.connect("notify::enabled", () => this.update_suffix_label_css())
	this.entry.connect("notify::override_state", () => this.update_suffix_label_css())
}
