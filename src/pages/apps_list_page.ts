import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"

import { GClass, Property, Child, Signal, from } from "../gobjectify/gobjectify.js"

import { AutostartEntry } from "../utils/autostart_entry.js"
// import { FileList } from "../utils/file_list.js"

import "../widgets/search_button.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/apps_list_page.ui" })
@Signal("app-clicked", { param_types: [AutostartEntry.$gtype] })
export class AppsListPage extends from(Adw.NavigationPage, {
	is_loading: Property.bool({ default: true }),
	no_results: Property.bool(),
	search_text: Property.string(),
	_only_entries_filter: Child(Gtk.CustomFilter),
	_entry_custom_sorter: Child(Gtk.CustomSorter),
	_entries: Child(Gio.ListModel),
}) {
	protected _on_search_change(): void {}
}
