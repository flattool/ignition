import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"

import { Entry } from "../utils/entry.js"
import { GObjectify } from "../utils/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { make_iterable } from "../utils/list_model_utils.js"
import { chunked_idler } from "../utils/async.js"
import "../utils/entry_list_model.js"
import "../gtk/loading_group.js"
import "../gtk/search_group.js"
import "../gtk/entry_list.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/entries_page" })
export class EntriesPage extends Adw.NavigationPage {
	@GObjectify.Child
	public accessor top_home_model!: Gio.ListModel<Entry>

	@GObjectify.Child
	public accessor top_root_model!: Gio.ListModel<Entry>

	@GObjectify.Child
	public accessor entry_sorter!: Gtk.CustomSorter

	@GObjectify.Property(Gio.File)
	public accessor home_autostart_dir: Gio.File

	@GObjectify.Property(Gio.File)
	public accessor root_autostart_dir: Gio.File

	@GObjectify.Property("bool", { default: true })
	public accessor is_loading!: boolean

	public constructor(params: Partial<Adw.NavigationPage.ConstructorProps>) {
		super(params)
		this.home_autostart_dir = SharedVars.home_autostart_dir
		this.root_autostart_dir = SharedVars.root_autostart_dir

		this.entry_sorter.set_sort_func((one: Entry, two: Entry): number => {
			const one_first = -1
			const one_last = 1

			if (one.enabled !== two.enabled) return one.enabled ? one_first : one_last
			if (one.override_state !== two.override_state) {
				if (one.override_state === "overridden") return one_last
				if (two.override_state === "overridden") return one_first
			}
			return one.title.localeCompare(two.title, undefined, { sensitivity: "base", numeric: true, usage: "sort" })
		})
	}

	@GObjectify.Debounce(200, { trigger: "leading" })
	protected async _start_loading(): Promise<void> { this.is_loading = true }

	@GObjectify.Debounce(200)
	protected async _mark_overrides(): Promise<void> {
		let something_changed = false
		const entry_map = new Map<string, Entry>()
		const idler = chunked_idler(100)

		for (const root_item of make_iterable(this.top_root_model)) {
			await idler()
			entry_map.set(root_item.file.get_basename() ?? "", root_item)
		}

		for (const home_item of make_iterable(this.top_home_model)) {
			await idler()
			const root_entry = entry_map.get(home_item.file.get_basename() ?? "")
			if (root_entry) {
				if (home_item.override_state !== "overrides") {
					home_item.override_state = "overrides"
					something_changed = true
				}
				if (root_entry.override_state !== "overridden") {
					root_entry.override_state = "overridden"
					something_changed = true
				}
			}
		}

		if (something_changed) this.entry_sorter.changed(Gtk.SorterChange.DIFFERENT)
		this.is_loading = false
	}
}
