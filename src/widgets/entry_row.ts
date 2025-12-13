import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"

import { GClass, from, Child, Property, next_idle } from "../gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { IconHelper } from "../utils/icon_helper.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/widgets/entry_row.ui" })
export class EntryRow extends from(Adw.ActionRow, {
	entry: Property.gobject(AutostartEntry, { flags: "CONSTRUCT_ONLY" }),
	_prefix_image: Child(Gtk.Image),
}) {
	async _ready(): Promise<void> {
		this.title = this.entry?.name.markup_escape_text() ?? ""
		this.subtitle = this.entry?.comment.markup_escape_text() ?? ""
		await next_idle()
		IconHelper.set_icon(this._prefix_image, this.entry?.icon)
	}
}
