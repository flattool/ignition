import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"
import GObject from "gi://GObject?version=2.0"

import { GClass, Property, Child, Signal, from } from "../gobjectify/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { EntryRow } from "../widgets/entry_row.js"
import { FileList } from "../utils/file_list.js"

import "../widgets/search_button.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/apps_list_page.ui" })
@Signal("app-clicked", { param_types: [AutostartEntry.$gtype] })
export class AppsListPage extends from(Adw.NavigationPage, {
	is_loading: Property.bool({ default: true }),
	no_results: Property.bool(),
	search_text: Property.string(),
	_entry_custom_sorter: Child<Gtk.CustomSorter>(),
	_entries: Child<Gio.ListModel<AutostartEntry>>(),
	_file_models_store: Child<Gio.ListStore<Gio.ListModel<AutostartEntry>>>(),
	_entries_group: Child<Adw.PreferencesGroup>(),
}) {
	_ready(): void {
		this._entry_custom_sorter.set_sort_func(AutostartEntry.compare.bind(AutostartEntry))
		for (const directory of SharedVars.host_app_entry_dirs) {
			if (!directory.query_exists(null)) continue
			const file_list = new FileList({ directory })
			const map_model = new Gtk.MapListModel({ model: file_list.with_implements })
			map_model.set_map_func(this.#entry_map_func.bind(this))
			const filter_model = new Gtk.FilterListModel<AutostartEntry>({
				model: map_model,
				filter: Gtk.CustomFilter.new((item) => item instanceof AutostartEntry),
			})
			this._file_models_store.append(filter_model)
		}
		this._entries_group.bind_model(this._entries, (item) => this.#row_creation_func(item as AutostartEntry))
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
	}
}
