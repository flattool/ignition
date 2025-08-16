import Adw from "gi://Adw?version=1"
import type Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { Entry } from "../utils/entry.js"
import { try_catch } from "../utils/safe.js"

export namespace EntryList {
	export interface ConstructorProps extends Partial<Adw.Bin.ConstructorProps> {
		directory?: Gio.File
	}
}

@GObjectify.Class({ template: "/io/github/flattool/Ignition/gtk/entry_list", ready })
@GObjectify.Signal("row-clicked", { param_types: [Entry.$gtype] })
export class EntryList extends Adw.Bin {
	@GObjectify.Child
	public accessor list_box!: Gtk.ListBox

	@GObjectify.Child
	public accessor custom_filter!: Gtk.CustomFilter

	@GObjectify.Child
	public accessor map_list_model!: Gtk.MapListModel

	@GObjectify.Child
	public accessor top_model!: Gio.ListModel<Entry>

	@GObjectify.Property(Gio.File)
	public accessor directory!: Gio.File

	@GObjectify.Property("string")
	public accessor search_text!: string

	@GObjectify.Property("uint32")
	public accessor total_entries!: number

	@GObjectify.Property("uint32")
	public accessor total_visible!: number

	@GObjectify.Property("bool")
	public accessor loading!: boolean

	public constructor(params?: EntryList.ConstructorProps) { super(params) }
}

function ready(this: EntryList): void {
	this.custom_filter.set_filter_func((item) => item instanceof Entry)
	this.map_list_model.set_map_func((item) => try_catch(
		() => new Entry({ file: (item as Gio.FileInfo).get_attribute_object("standard::file") }),
		() => item,
	))
	this.list_box.bind_model(this.top_model, (entry) => {
		const row = new Adw.ActionRow({ title: entry.title })
		row.connect("activated", () => this.emit("row-clicked", entry))
		return row
	})
}
