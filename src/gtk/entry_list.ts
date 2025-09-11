import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { Entry } from "../utils/entry.js"
import { EntryRow } from "./entry_row.js"
import { chunked_idler } from "../utils/async.js"

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

	@GObjectify.Property("string", { effect(item) { this.do_search(item) } })
	public accessor search_text!: string

	@GObjectify.Property("uint32")
	public accessor total_entries!: number

	@GObjectify.Property("uint32")
	public accessor total_visible!: number

	@GObjectify.Property(Gio.ListModel, {
		flags: "CONSTRUCT_ONLY",
		effect(item) { item.connect("items-changed", () => this.on_items_changed()) },
	}) public accessor entry_list_model!: Gio.ListModel<Entry>

	public constructor(params: EntryList.ConstructorProps) {
		super(params)
		this.list_box.bind_model(this.entry_list_model, (entry) => {
			const row = new EntryRow({ entry })
			row.connect("activated", () => this.emit("row-clicked", entry))
			return row
		})
	}

	@GObjectify.Debounce(200)
	private async on_items_changed(): Promise<void> {
		this.total_entries = this.entry_list_model.get_n_items()
		await this.do_search(this.search_text)
	}

	private async do_search(text: string): Promise<void> {
		const idler = chunked_idler(100)
		const search = text.toLocaleLowerCase()
		let visible_count = 0
		for (const row of this.list_box) {
			await idler()
			if (!(row instanceof EntryRow)) continue
			row.visible = (
				row.title.toLocaleLowerCase().includes(search)
				|| row.subtitle.toLocaleLowerCase().includes(search)
			)
			if (row.visible) visible_count += 1
		}
		this.total_visible = visible_count
	}
}
