import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"
import GObject from "gi://GObject?version=2.0"

import { GClass, Property, Child, from, Signal, Debounce } from "../gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { SharedVars } from "../utils/shared_vars.js"
import { HelpDialog } from "../widgets/help_dialog.js"
import { EntryGroup } from "../widgets/entry_group.js"

import { FileList } from "../utils/file_list.js"
import "../widgets/loading_group.js"
import "../widgets/search_group.js"
import "../widgets/search_button.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/entries_page.ui" })
@Signal("entry-clicked", { param_types: [AutostartEntry.$gtype] })
export class EntriesPage extends from(Adw.NavigationPage, {
	is_loading: Property.bool({ default: false }),
	no_results: Property.bool(),
	home_dir: Property.gobject(Gio.File),
	root_dir: Property.gobject(Gio.File),
	search_text: Property.string(),
	_entry_custom_sorter: Child<Gtk.CustomSorter>(),
	_home_entries: Child<Gio.ListModel<AutostartEntry>>(),
	_root_entries: Child<Gio.ListModel<AutostartEntry>>(),
	_home_map_model: Child<Gtk.MapListModel>(),
	_root_map_model: Child<Gtk.MapListModel>(),
	_only_entries_filter: Child<Gtk.CustomFilter>(),
	_home_group: Child<EntryGroup>(),
	_empty_row: Child<Adw.ActionRow>(),
}) {
	#_show_empty_row = false
	get #show_empty_row(): boolean { return this.#_show_empty_row }
	set #show_empty_row(val: boolean) {
		if (val === this.#_show_empty_row) return
		this.#_show_empty_row = val
		; (val ? this._home_group.add : this._home_group.remove).call(this._home_group, this._empty_row)
	}

	_ready(): void {
		this._entry_custom_sorter.set_sort_func(AutostartEntry.compare.bind(AutostartEntry))
		this._only_entries_filter.set_filter_func((item: GObject.Object) => item instanceof AutostartEntry)
		this._home_map_model.set_map_func(this.#entry_map_func.bind(this))
		this._root_map_model.set_map_func(this.#entry_map_func.bind(this))
		this.home_dir = SharedVars.home_autostart_dir
		this.root_dir = SharedVars.root_autostart_dir
	}

	#entry_map_func(item: GObject.Object): AutostartEntry | GObject.Object {
		if (!(item instanceof Gio.File)) return item
		const path: string = item.get_path() ?? ""
		if (AutostartEntry.verify_file(path) !== "") return item
		const entry = new AutostartEntry({ path })
		const file_name: string = item.get_basename() ?? ""
		const is_root: boolean = path.includes(SharedVars.root_autostart_dir.get_path() ?? "")
		if (is_root) {
			if (SharedVars.home_autostart_dir.get_child(file_name).query_exists(null)) {
				entry.override_state = "OVERRIDDEN"
			}
		} else {
			if (SharedVars.root_autostart_dir.get_child(file_name).query_exists(null)) {
				entry.override_state = "OVERRIDES"
			}
		}
		return entry
	}

	@Debounce(200)
	protected async _on_change_end(_list: FileList): Promise<void> {
		this.#show_empty_row = this._home_entries.get_n_items() < 1
	}

	protected _get_is_loading(__: this, home_loading: boolean, root_loading: boolean, self_loading: boolean): boolean {
		return home_loading || root_loading || self_loading
	}

	protected _get_no_search_results(__: this, no_home_results: boolean, no_root_results: boolean): boolean {
		return no_home_results && no_root_results
	}

	protected _on_search_change(entry: Gtk.SearchEntry): void {
		this.search_text = entry.get_text()
	}

	protected _show_help(): void {
		new HelpDialog({}).present(this)
	}
}
