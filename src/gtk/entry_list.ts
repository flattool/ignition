import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { Entry } from "../utils/entry.js"
import { EntryRow } from "./entry_row.js"
import type { EntryListModel } from "../utils/entry_list_model.js"

export namespace EntryList {
	export interface ConstructorProps extends Partial<Adw.Bin.ConstructorProps> {
		entry_list_model: Gio.ListModel<Entry>
	}
}

@GObjectify.Class({ template: "/io/github/flattool/Ignition/gtk/entry_list" })
@GObjectify.Signal("row-clicked", { param_types: [Entry.$gtype] })
export class EntryList extends Adw.Bin {
	@GObjectify.Child
	public accessor list_box!: Gtk.ListBox

	@GObjectify.Property("string")
	public accessor search_text!: string

	@GObjectify.Property("uint32")
	public accessor total_entries!: number

	@GObjectify.Property("uint32")
	public accessor total_visible!: number

	@GObjectify.Property("bool")
	public accessor loading!: boolean

	@GObjectify.Property(Gio.ListModel, { flags: "CONSTRUCT_ONLY" })
	public accessor entry_list_model!: EntryListModel

	public constructor(params: EntryList.ConstructorProps) {
		super(params)
		this.list_box.bind_model(this.entry_list_model, (entry) => {
			const row = new EntryRow({ entry })
			row.connect("activated", () => this.emit("row-clicked", entry))
			return row
		})
	}
}
