import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"

import { GObjectify } from "../utils/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { Entry } from "../utils/entry.js"
import { try_catch } from "../utils/safe.js"
import "../gtk/loading_group.js"
import "../gtk/search_group.js"
import "../gtk/entry_list.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/entries_page" })
export class EntriesPage extends Adw.NavigationPage {
	@GObjectify.Child
	public accessor only_entries_filter!: Gtk.CustomFilter

	@GObjectify.Child
	public accessor map_model!: Gtk.MapListModel

	@GObjectify.Property(Gio.File)
	public accessor home_autostart_dir: Gio.File

	@GObjectify.Property(Gio.File)
	public accessor root_autostart_dir: Gio.File

	public constructor(params: Partial<Adw.NavigationPage.ConstructorProps>) {
		super(params)
		this.home_autostart_dir = SharedVars.home_autostart_dir
		this.root_autostart_dir = SharedVars.root_autostart_dir

		this.only_entries_filter.set_filter_func((item) => item instanceof Entry)
		this.map_model.set_map_func((item) => try_catch(
			() => new Entry({ file: (item as Gio.FileInfo).get_attribute_object("standard::file") }),
			() => item,
		))
	}
}
