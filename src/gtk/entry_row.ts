import Adw from "gi://Adw?version=1"
import type Gtk from "gi://Gtk?version=4.0"

import { GObjectify } from "../utils/gobjectify.js"
import { Entry } from "../utils/entry.js"
import { set_icon } from "../utils/icon_helpers.js"

export namespace EntryRow {
	export interface ConstructorProps {
		entry: Entry
	}
}

@GObjectify.Class({ template: "/io/github/flattool/Ignition/gtk/entry_row", ready })
export class EntryRow extends Adw.ActionRow {
	@GObjectify.Child
	public accessor prefix_icon!: Gtk.Image

	@GObjectify.Property("string")
	public accessor suffix_text!: string

	@GObjectify.Property(Entry, { flags: "CONSTRUCT_ONLY" })
	public accessor entry!: Entry

	public constructor(params: EntryRow.ConstructorProps) {
		// @ts-expect-error: params has nothing in common with Adw.ActionRow.ConstructorProps,
		//   but we need to pass our own properties to super
		super(params)
		this.suffix_text = params.entry.enabled ? _("Enabled") : _("Disabled")
	}
}

function ready(this: EntryRow): void {
	set_icon(this.prefix_icon, this.entry.icon)
}
