import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"
import GObject from "gi://GObject?version=2.0"

import { GClass, Property, Child, Signal, from } from "../gobjectify/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { FileList } from "../utils/file_list.js"
import { EntryGroup } from "../widgets/entry_group.js"

import "../widgets/loading_group.js"
import "../widgets/search_button.js"
import "../widgets/search_group.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/apps_list_page.ui" })
@Signal("app-clicked", { param_types: [AutostartEntry.$gtype] })
export class AppsListPage extends from(Adw.NavigationPage, {
	search_text: Property.string(),
	show_hidden: Property.bool(),
	_entries: Child<Gio.ListModel<AutostartEntry>>(),
	_entry_models: Child<Gio.ListStore>(),
	_entry_sorter: Child<Gtk.CustomSorter>(),
	_entries_group: Child<EntryGroup>(),
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

	protected async _on_search_change(entry: Gtk.SearchEntry): Promise<void> {
		this.search_text = entry.get_text()
	}

	protected _on_script_clicked(_row: Adw.ActionRow): void {
		this.emit("app-clicked", null)
	}

	protected _on_entry_clicked(_group: EntryGroup, entry: AutostartEntry): void {
		this.emit("app-clicked", entry)
	}
}
