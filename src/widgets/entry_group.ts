import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"

import { GClass, Child, Property, from, Debounce, Signal, OnSignal, next_idle } from "../gobjectify/gobjectify.js"
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
	_search_filter: Child<Gtk.EveryFilter>(),
	_no_hidden_filter: Child<Gtk.CustomFilter>(),
}) {
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
		}
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
