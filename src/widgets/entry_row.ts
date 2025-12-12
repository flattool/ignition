import Adw from "gi://Adw?version=1"

import { GClass, from, Property } from "../gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/widgets/entry_row.ui" })
export class EntryRow extends from(Adw.ActionRow, {
	entry: Property.gobject(AutostartEntry, { flags: "CONSTRUCT_ONLY" }),
}) {
	_ready(): void {
		this.title = this.entry?.name.markup_escape_text() ?? ""
		this.subtitle = this.entry?.comment.markup_escape_text() ?? ""
	}
}
