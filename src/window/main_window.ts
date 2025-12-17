import Adw from "gi://Adw"

import { GClass, from, Child } from "../gobjectify/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { EntriesPage } from "../pages/entries_page.js"
import { AutostartEntry } from "../utils/autostart_entry.js"

import "../pages/apps_list_page.js"

enum PageTags {
	APPS_LIST = "apps-list-page",
	ENTRIES = "entries-page",
}

@GClass({ template: "resource:///io/github/flattool/Ignition/window/main_window.ui" })
export class MainWindow extends from(Adw.ApplicationWindow, {
	_nav_view: Child<Adw.NavigationView>(),
}) {
	// readonly #settings = new Gio.Settings({ schema: pkg.app_id })
	readonly _toast_overlay = new Adw.ToastOverlay()

	_ready(): void {
		if (pkg.profile === "development") this.add_css_class("devel")
		SharedVars.application?.new_entry.connect("activate", this.#on_new_entry.bind(this))
	}

	#on_new_entry(): void {
		if (this._nav_view.get_visible_page_tag() === PageTags.APPS_LIST) return
		this._nav_view.push_by_tag(PageTags.APPS_LIST)
	}

	protected _on_entry_clicked(page: EntriesPage, entry: AutostartEntry): void {
		print(page, entry)
	}
}
