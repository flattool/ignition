import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import type Gio from "gi://Gio?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { EntryListModel } from "../utils/entry_list_model.js"
import { SharedVars } from "../utils/shared_vars.js"
import { Entry } from "../utils/entry.js"
import "../gtk/search_group.js"
import "../gtk/entry_list.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/app_list_page" })
export class AppListPage extends Adw.NavigationPage {
	@GObjectify.Child
	private accessor entry_list_models_model!: Gio.ListStore<EntryListModel>

	@GObjectify.Child
	protected accessor top_model!: Gio.ListModel<Entry>

	@GObjectify.Child
	protected accessor hidden_filter!: Gtk.BoolFilter

	@GObjectify.Property("bool", { effect(value) { this.update_hidden_filter(value).catch(log) } })
	public accessor show_hidden_entries!: boolean

	@GObjectify.Property("string")
	public accessor search_text!: string

	public constructor(params: Adw.NavigationPage.ConstructorProps) {
		super(params)
		for (const file of SharedVars.host_app_entry_dirs) {
			const model = new EntryListModel({ file })
			this.entry_list_models_model.append(model)
			// model.connect("items-changed", () => this._items_changed())
		}
	}

	protected async update_hidden_filter(show_hidden: boolean): Promise<void> {
		this.hidden_filter.changed(show_hidden ? Gtk.FilterChange.LESS_STRICT : Gtk.FilterChange.MORE_STRICT)
	}

	protected _on_search_changed(search_entry: Gtk.SearchEntry): void {
		this.search_text = search_entry.text
	}

	protected _should_entry_be_shown(__: this, no_display: boolean, entry_enabled: boolean): boolean {
		return this.show_hidden_entries || (entry_enabled && !no_display)
	}

	protected _get_no_results(__: this, total_entries: number, total_visible: number): boolean {
		return total_entries > 0 && total_visible === 0
	}
}
