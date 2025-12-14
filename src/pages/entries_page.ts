import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"
import GObject from "gi://GObject?version=2.0"

import { GClass, Property, Child, from, Signal } from "../gobjectify/gobjectify.js"
import { FileList } from "../utils/file_list.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { SharedVars } from "../utils/shared_vars.js"
import { EntryRow } from "../widgets/entry_row.js"

import "../widgets/loading_group.js"
import "../widgets/search_group.js"
import "../widgets/search_button.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/entries_page.ui" })
@Signal("entry-clicked", { param_types: [AutostartEntry.$gtype] })
export class EntriesPage extends from(Adw.NavigationPage, {
	is_loading: Property.bool({ default: true }),
	no_results: Property.bool(),
	home_dir: Property.gobject(Gio.File),
	root_dir: Property.gobject(Gio.File),
	search_text: Property.string(),
	_entry_custom_sorter: Child(Gtk.CustomSorter),
	_home_entries: Child(Gio.ListModel),
	_root_entries: Child(Gio.ListModel),
	_home_group: Child(Adw.PreferencesGroup),
	_root_group: Child(Adw.PreferencesGroup),
	_home_map_model: Child(Gtk.MapListModel),
	_root_map_model: Child(Gtk.MapListModel),
	_only_entries_filter: Child(Gtk.CustomFilter),
}) {
	#lists_loading = new Set<FileList>()

	_ready(): void {
		this._entry_custom_sorter.set_sort_func((a: AutostartEntry, b: AutostartEntry): -1 | 1 => {
			if (b.enabled && !a.enabled) return 1
			if (b.override_state !== "OVERRIDDEN" && a.override_state === "OVERRIDDEN") return 1
			if (b.name.toLocaleLowerCase() < a.name.toLocaleLowerCase()) return 1
			return -1
		})

		this._only_entries_filter.set_filter_func((item: GObject.Object) => item instanceof AutostartEntry)
		this._home_map_model.set_map_func(this.#entry_map_func.bind(this))
		this._root_map_model.set_map_func(this.#entry_map_func.bind(this))
		this._home_group.bind_model(this._home_entries, (item) => this.#row_creation_func(item as AutostartEntry))
		this._root_group.bind_model(this._root_entries, (item) => this.#row_creation_func(item as AutostartEntry))
		this.home_dir = SharedVars.home_autostart_dir
		this.root_dir = SharedVars.root_autostart_dir
	}

	#entry_map_func(item: GObject.Object): AutostartEntry | GObject.Object {
		if (!(item instanceof Gio.File)) return item
		const path: string = item.get_path() ?? ""
		if (AutostartEntry.verify_file(path) === "") return new AutostartEntry({ path })
		return item
	}

	#row_creation_func(entry: AutostartEntry): EntryRow {
		const row = new EntryRow({ entry, activatable: true })
		row.connect("activated", () => this.emit("entry-clicked", entry))
		return row
	}

	protected _on_search_change(entry: Gtk.SearchEntry): void {
		this.search_text = entry.get_text()
		const any_home: boolean = this._home_entries.get_n_items() > 0
		const any_root: boolean = this._root_entries.get_n_items() > 0
		this._home_group.visible = any_home
		this._root_group.visible = any_root
		this.no_results = this.search_text !== "" && !any_root && !any_root
	}

	protected _list_started_loading(list: FileList): void {
		this.#lists_loading.add(list)
		this.is_loading = this.#lists_loading.size > 0
	}

	protected _list_changed(list: FileList): void {
		this.#lists_loading.delete(list)
		this.is_loading = this.#lists_loading.size > 0
	}
}
