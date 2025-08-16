import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"

import { GObjectify } from "../utils/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import "../gtk/loading_group.js"
import "../gtk/search_group.js"
import "../gtk/entry_list.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/entries_page", ready })
export class EntriesPage extends Adw.NavigationPage {
	@GObjectify.Property(Gio.File)
	public accessor home_autostart_dir: Gio.File// = SharedVars.home_autostart_dir

	public constructor(params: Partial<Adw.NavigationPage.ConstructorProps>) {
		super(params)
		this.home_autostart_dir = SharedVars.home_autostart_dir
	}
}

function ready(this: EntriesPage): void {
	print("EntriesPage, home_dir:", this.home_autostart_dir.get_path())
}
