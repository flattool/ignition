import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"

import { GClass, Property, Child, Signal, from, Debounce, next_idle } from "../gobjectify/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { EntryGroup } from "../widgets/entry_group.js"

import "../widgets/loading_group.js"
import "../widgets/search_button.js"
import "../widgets/search_group.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/apps_list_page.ui" })
export class AppsListPage extends from(Adw.NavigationPage, {
	search_text: Property.readwrite.string(),
	show_hidden: Property.readwrite.bool(),
	app_clicked: Signal([AutostartEntry]),
	_entries: Child<Gio.ListModel<AutostartEntry>>(),
	_entry_sorter: Child<Gtk.CustomSorter>(),
	_entry_store: Child<Gio.ListStore<AutostartEntry>>(),
	_entries_group: Child<EntryGroup>(),
}) {
	readonly #home_monitor = SharedVars.home_autostart_dir.monitor_directory(Gio.FileMonitorFlags.NONE, null)

	constructor(params?: typeof AppsListPage.$params) {
		super(params)
		this._entry_sorter.set_sort_func(AutostartEntry.compare.bind(AutostartEntry))
		this.#setup_app_list().catch(log)
		this.#home_monitor.$connect("changed", () => this.#on_home_entries_changed())
	}

	async #setup_app_list(): Promise<void> {
		this._entry_store.remove_all()
		for (const directory of SharedVars.host_app_entry_dirs) {
			if (!directory.query_exists(null)) continue
			for (const info of directory.enumerate_children(
				Gio.FILE_ATTRIBUTE_STANDARD_NAME,
				Gio.FileQueryInfoFlags.NONE,
				null,
			)) {
				await next_idle()
				const child = directory.get_child(info.get_name())
				const path = child.get_path() ?? ""
				if (AutostartEntry.verify_file(path) === "") {
					this._entry_store.append(new AutostartEntry({ path }))
				}
			}
		}
	}

	@Debounce(200)
	async #on_home_entries_changed(): Promise<void> {
		await this.#setup_app_list()
	}

	protected async _on_search_change(entry: Gtk.SearchEntry): Promise<void> {
		this.search_text = entry.get_text()
	}

	protected _on_script_clicked(_row: Adw.ActionRow): void {
		this.$emit("app-clicked", null)
	}

	protected _on_entry_clicked(_group: EntryGroup, entry: AutostartEntry): void {
		this.$emit("app-clicked", entry)
	}
}
