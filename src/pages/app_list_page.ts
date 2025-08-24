import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { EntryListModel } from "../utils/entry_list_model.js"
import { SharedVars } from "../utils/shared_vars.js"
import { make_iterable } from "../utils/list_model_utils.js"
import { chunked_idler } from "../utils/async.js"
import type { Entry } from "../utils/entry.js"
import "../gtk/search_group.js"
import "../gtk/entry_list.js"
import { EntryRow } from "../gtk/entry_row.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/app_list_page" })
export class AppListPage extends Adw.NavigationPage {
	@GObjectify.Child
	private accessor entry_list_models_model!: Gio.ListStore<EntryListModel>

	@GObjectify.Child
	protected accessor top_model!: Gio.ListModel<Entry>

	@GObjectify.Child
	protected accessor lb!: Gtk.ListBox

	public constructor(params: Adw.NavigationPage.ConstructorProps) {
		super(params)
		for (const file of SharedVars.host_app_entry_dirs) {
			print(file)
			const model = new EntryListModel({ file })
			// model.file = file
			this.entry_list_models_model.append(model)
			model.connect("items-changed", () => this._items_changed())
		}
	}

	protected _test(): void {
		for (const model of this.entry_list_models_model) {
			print(model.monitor, model.file?.get_path())
		}
	}

	@GObjectify.Debounce(200)
	protected async _items_changed(): Promise<void> {
		this.lb.remove_all()
		const idler = chunked_idler(100)
		for (const entry of make_iterable(this.top_model)) {
			await idler()
			this.lb.append(new EntryRow({ entry }))
		}
	}
}
