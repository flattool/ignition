import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import type Gio from "gi://Gio?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { EntryListModel } from "../utils/entry_list_model.js"
import { SharedVars } from "../utils/shared_vars.js"
import { EntryRow } from "../gtk/entry_row.js"
import { Entry } from "../utils/entry.js"
import { chunked_idler } from "../utils/helper_funcs.js"
import "../gtk/search_group.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/app_list_page" })
export class AppListPage extends Adw.NavigationPage {
	@GObjectify.Child
	protected accessor entry_list_models_model!: Gio.ListStore<EntryListModel>

	@GObjectify.Child
	protected accessor top_model!: Gio.ListModel<Entry>

	@GObjectify.Child
	protected accessor list_box!: Gtk.ListBox

	@GObjectify.Property("bool", { effect() { this.redo_search().catch(log) } })
	public accessor show_hidden_entries!: boolean

	@GObjectify.Property("bool")
	public accessor no_search_results!: boolean

	@GObjectify.Property("string")
	public accessor search_text!: string

	@GObjectify.Property("double")
	public accessor total_apps!: number

	public constructor(params: Adw.NavigationPage.ConstructorProps) {
		super(params)
		for (const file of SharedVars.host_app_entry_dirs) {
			this.entry_list_models_model.append(new EntryListModel({ file }))
		}
		this.list_box.bind_model(this.top_model, (entry) => new EntryRow({ entry, show_suffix_label: false }))
	}

	@GObjectify.Debounce(200)
	protected async _items_changed(): Promise<void> {
		await this.redo_search()
	}

	protected async redo_search(): Promise<void> {
		const idler = chunked_idler(100)
		const search = this.search_text.toLocaleLowerCase()
		const seen_execs = new Set<string>()
		this.total_apps = this.top_model.get_n_items()

		let total_visible = 0
		for (const row of this.list_box) {
			await idler()
			if (!(row instanceof EntryRow)) continue

			if (seen_execs.has(row.entry.exec)) {
				row.visible = false
				continue
			}
			seen_execs.add(row.entry.exec)

			const is_hidden_entry = row.entry.no_display || !row.entry.enabled
			const matches_search = (
				row.title.toLocaleLowerCase().includes(search)
				|| row.subtitle.toLocaleLowerCase().includes(search)
			)

			row.visible = matches_search && (this.show_hidden_entries || !is_hidden_entry)
			if (row.visible) total_visible += 1
		}
		this.no_search_results = total_visible === 0 && this.total_apps > 0
	}

	protected _get_any_apps(__: this, total_apps: number): boolean {
		return total_apps > 0
	}

	protected _on_search_changed(search_entry: Gtk.SearchEntry): void {
		this.search_text = search_entry.text
		this.redo_search().catch(log)
	}

	protected _get_no_results(__: this, total_entries: number, total_visible: number): boolean {
		return total_entries > 0 && total_visible === 0
	}
}
