import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"
import GObject from "gi://GObject?version=2.0"

import { GClass, Property, Child, Signal, from, Debounce, next_idle, OnSignal } from "../gobjectify/gobjectify.js"
import { iterate_model } from "../utils/helper_funcs.js"
import { SharedVars } from "../utils/shared_vars.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { EntryRow } from "../widgets/entry_row.js"
import { FileList } from "../utils/file_list.js"

import "../widgets/search_button.js"
import "../widgets/search_group.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/apps_list_page.ui" })
@Signal("app-clicked", { param_types: [AutostartEntry.$gtype] })
export class AppsListPage extends from(Adw.NavigationPage, {
	is_loading: Property.bool({ default: true }),
	no_results: Property.bool(),
	search_text: Property.string(),
	show_hidden: Property.bool(),
	_entries: Child<Gio.ListModel<AutostartEntry>>(),
	_entry_sorter: Child<Gtk.CustomSorter>(),
	_entry_models: Child<Gio.ListStore>(),
	_entries_group: Child<Adw.PreferencesGroup>(),
}) {
	_ready(): void {
		this._entry_sorter.set_sort_func(AutostartEntry.compare.bind(AutostartEntry))
		SharedVars.host_app_entry_dirs.forEach(this.#setup_app_list.bind(this))
	}

	#setup_app_list(directory: Gio.File): void {
		if (!directory.query_exists(null)) return
		const file_list = new FileList({ directory })
		const file_to_entry_model = Gtk.MapListModel.new(file_list.with_implements, this.#entry_map_func.bind(this))
		const only_entries_filter = Gtk.CustomFilter.new((item: GObject.Object) => item instanceof AutostartEntry)
		const filter_model = Gtk.FilterListModel.new(file_to_entry_model, only_entries_filter)
		this._entry_models.append(filter_model)
	}

	#entry_map_func(item: GObject.Object): AutostartEntry | GObject.Object {
		if (!(item instanceof Gio.File)) return item
		const path: string = item.get_path() ?? ""
		if (AutostartEntry.verify_file(path) === "") return new AutostartEntry({ path })
		return item
	}

	@OnSignal("notify::search-text")
	@OnSignal("notify::show-hidden")
	async #do_search(): Promise<void> {
		print("do search", Math.random())
		const name_expr = Gtk.PropertyExpression.new(AutostartEntry.$gtype, null, "name")
		const filter = Gtk.StringFilter.new(name_expr)
		filter.search = this.search_text
		let any_results = false
		for (let i = 0; ; i += 1) {
			const row: Gtk.Widget | null = this._entries_group.get_row(i)
			if (row === null) break
			if (!(row instanceof EntryRow)) continue
			const entry: AutostartEntry | null = row.entry
			if (entry === null) continue
			let matches = true
			if (!filter.match(entry)) matches = false
			if (!this.show_hidden && entry.is_hidden()) matches = false
			row.visible = matches
			any_results ||= matches
		}
		this.no_results = !any_results
	}

	@Debounce(200, { trigger: "leading" })
	protected _on_change_start(): void {
		this.is_loading = true
	}

	@Debounce(200)
	protected async _on_change_end(): Promise<void> {
		this._entries_group.remove_all()
		for (const entry of iterate_model(this._entries)) {
			await next_idle()
			const row = new EntryRow({ entry })
			row.connect("activated", () => this.emit("app-clicked", entry))
			this._entries_group.add(row)
		}
		await this.#do_search()
		this.is_loading = false
	}

	protected async _on_search_change(entry: Gtk.SearchEntry): Promise<void> {
		this.search_text = entry.get_text()
	}
}
