import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"

import { GObjectify } from "../utils/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { Entry } from "../utils/entry.js"
import { try_catch } from "../utils/safe.js"
import { chunked_idler } from "../utils/async.js"
import { make_iterable } from "../utils/list_model_utils.js"
import "../gtk/loading_group.js"
import "../gtk/search_group.js"
import "../gtk/entry_list.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/entries_page" })
export class EntriesPage extends Adw.NavigationPage {
	@GObjectify.Child
	public accessor only_entries_filter!: Gtk.CustomFilter

	@GObjectify.Child
	public accessor home_map_model!: Gtk.MapListModel<Entry>

	@GObjectify.Child
	public accessor root_map_model!: Gtk.MapListModel<Entry>

	@GObjectify.Child
	public accessor top_home_model!: Gio.ListModel<Entry>

	@GObjectify.Child
	public accessor top_root_model!: Gio.ListModel<Entry>

	@GObjectify.Property(Gio.File)
	public accessor home_autostart_dir: Gio.File

	@GObjectify.Property(Gio.File)
	public accessor root_autostart_dir: Gio.File

	public constructor(params: Partial<Adw.NavigationPage.ConstructorProps>) {
		super(params)
		this.home_autostart_dir = SharedVars.home_autostart_dir
		this.root_autostart_dir = SharedVars.root_autostart_dir

		this.only_entries_filter.set_filter_func((item) => item instanceof Entry)
		const map_func = (item: Gio.FileInfo): Entry | null => try_catch(
			() => new Entry({ file: (item as Gio.FileInfo).get_attribute_object("standard::file") }),
			() => null,
		)
		this.home_map_model.set_map_func((item) => map_func(item as Gio.FileInfo) ?? item)
		this.root_map_model.set_map_func((item) => map_func(item as Gio.FileInfo) ?? item)
	}

	@GObjectify.Debounce(200)
	protected async _mark_overrides(): Promise<void> {
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
				home_item.override_state = "overrides"
				root_entry.override_state = "overridden"
			}
		}
	}
}
