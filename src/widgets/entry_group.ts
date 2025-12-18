import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"

import { GClass, Child, Property, from, Debounce, Signal, OnSignal, next_idle } from "../gobjectify/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { EntryRow } from "./entry_row.js"
import { iterate_model } from "../utils/helper_funcs.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/widgets/entry_group.ui" })
@Signal("entry-clicked", { param_types: [AutostartEntry.$gtype] })
export class EntryGroup extends from(Adw.PreferencesGroup, {
	entries: Property.gobject(Gio.ListModel, { flags: "CONSTRUCT_ONLY" }).as<Gio.ListModel<AutostartEntry>>(),
	show_hidden: Property.bool(),
	search_text: Property.string(),
	no_search_results: Property.bool(),
	is_loading: Property.bool(),
	deduplicate: Property.bool(),
	_search_filter: Child<Gtk.EveryFilter>(),
	_no_hidden_filter: Child<Gtk.CustomFilter>(),
}) {
	readonly #exec_to_row = new Map<string, { readonly row: EntryRow, readonly rank: number }>()

	_ready(): void {
		this.entries?.connect("items-changed", () => this.#on_change())
		this._no_hidden_filter.set_filter_func((item) => {
			const entry = item as AutostartEntry
			if (this.show_hidden) return true
			return !entry.is_hidden()
		})
	}

	#on_change(): void {
		void this.#update_rows()
		this.is_loading = true
	}

	#check_handle_duplicate(entry: AutostartEntry, row: EntryRow): void {
		const exec: string = entry.exec
		const filename: string = Gio.File.new_for_path(entry.path).get_basename() ?? ""
		let rank: number // lower the number, higher the priority to choose this duplicate
		for (rank = 0; rank < SharedVars.host_app_entry_dirs.length; rank += 1) {
			const dir: Gio.File = SharedVars.host_app_entry_dirs[rank]!
			if (dir.get_child(filename).query_exists(null)) break
		}
		if (this.#exec_to_row.has(exec)) {
			const { row: other_row, rank: other_rank } = this.#exec_to_row.get(exec)!
			if (rank > other_rank) return
			this.#exec_to_row.set(exec, { row, rank })
			this.remove(other_row)
		} else {
			this.#exec_to_row.set(exec, { row, rank })
		}
	}

	@Debounce(200)
	async #update_rows(): Promise<void> {
		this.#remove_all()
		if (this.entries === null) return
		for (const entry of iterate_model(this.entries)) {
			await next_idle()
			const row = new EntryRow({ entry })
			row.connect("activated", () => this.emit("entry-clicked", entry))
			row.visible = this._search_filter.match(entry)
			this.add(row)
			if (this.deduplicate) {
				this.#check_handle_duplicate(entry, row)
			}
		}
		this.#exec_to_row.clear()
		this.is_loading = false
	}

	@OnSignal("notify::show-hidden")
	@OnSignal("notify::search-text")
	async #do_search(): Promise<void> {
		let any_result = false
		for (let i = 0; ; i += 1) {
			await next_idle()
			const row: Gtk.Widget | null = this.get_row(i)
			if (row === null) break
			if (!(row instanceof EntryRow)) continue
			const entry = row.entry
			if (entry === null) continue
			if (this._search_filter.match(entry)) {
				any_result = true
				row.visible = true
			} else {
				row.visible = false
			}
		}
		this.no_search_results = this.search_text !== "" && !any_result
	}

	#remove_all(): void {
		let i = 0
		while (true) {
			const row: Gtk.Widget | null = this.get_row(i)
			if (row === null) break
			if (row instanceof EntryRow) {
				this.remove(row)
			} else {
				i += 1
			}
		}
	}
}
