import GObject from "gi://GObject?version=2.0"
import Gio from "gi://Gio?version=2.0"

import { GObjectify } from "./gobjectify.js"
import { Entry } from "./entry.js"
import { chunked_idler } from "./async.js"

@GObjectify.Class({ implements: [Gio.ListModel], manual_gtype_name: "EntryListModel" })
// @ts-expect-error
export class EntryListModel extends GObject.Object implements Gio.ListModel<Entry> {
	@GObjectify.Property(Gio.File, { effect(file) { this.on_file_set(file) } })
	public accessor file!: Gio.File | null

	public monitor: Gio.FileMonitor | null = null
	private change_connect_id: number | null = null
	private list = new Array<Entry>()

	public constructor(params?: Partial<Gio.ListModel.ConstructorProps> & { file?: Gio.File }) {
		// @ts-expect-error: GObject has no construct param, but we need to pass our own properties to super
		super(params)
	}

	// Satisfy Gio.ListModel interface
	public vfunc_get_item(position: number): Entry | null {
		return this.list[position] ?? null
	}

	public vfunc_get_item_type(): GObject.GType {
		return Entry.$gtype
	}

	public vfunc_get_n_items(): number {
		return this.list.length
	}
	//

	public [Symbol.iterator](): ArrayIterator<Entry> {
		return this.list[Symbol.iterator]()
	}

	private cleanup(): void {
		if (this.change_connect_id) {
			this.monitor?.disconnect(this.change_connect_id)
			this.change_connect_id = null
		}
		this.monitor?.cancel()
		this.monitor = null
	}

	private on_file_set(file: Gio.File | null): void {
		if (!file) {
			this.cleanup()
			return
		} else if (file.query_file_type(null, null) !== Gio.FileType.DIRECTORY) {
			this.cleanup()
			throw new Error("EntryListInternal, file: Cannot set a file that is not a directory")
		}
		this.monitor?.cancel()
		this.monitor = file.monitor_directory(Gio.FileMonitorFlags.NONE, null)
		this.change_connect_id = this.monitor.connect("changed", () => this.changed().catch(log))
		this.changed()
	}

	@GObjectify.Debounce(200)
	private async changed(): Promise<void> {
		const old_length = this.list.length
		const dir = this.file
		if (!dir) {
			this.list = []
			if (old_length > 0) $(this).items_changed(0, old_length, 0)
			return
		}

		const idler = chunked_idler(100)
		const enumerator = dir.enumerate_children("standard::*", Gio.FileQueryInfoFlags.NONE, null)
		const new_list = new Array<Entry>()

		try {
			let info: Gio.FileInfo | null
			while ((info = enumerator.next_file(null)) !== null) {
				await idler()
				try {
					new_list.push(new Entry({ file: dir.get_child(info.get_name()) }))
				} catch {}
			}
		} finally {
			enumerator.close(null)
		}

		const new_length = new_list.length
		this.list = new_list
		$(this).items_changed(0, old_length, new_length)
	}
}

function $(item: EntryListModel): Gio.ListModel<Entry> {
	return item as unknown as Gio.ListModel<Entry>
}
