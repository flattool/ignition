import Adw from "gi://Adw"

import { GClass, from, Child } from "../gobjectify/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { EntriesPage } from "../pages/entries_page.js"
import { AppsListPage } from "../pages/apps_list_page.js"
import { DetailsPage } from "../pages/details_page.js"
import { add_toast } from "../utils/helper_funcs.js"

enum PageTags {
	APPS_LIST = "apps-list-page",
	DETAILS = "details-page",
	ENTRIES = "entries-page",
}

@GClass({ template: "resource:///io/github/flattool/Ignition/window/main_window.ui" })
export class MainWindow extends from(Adw.ApplicationWindow, {
	_toast_overlay: Child<Adw.ToastOverlay>(),
	_nav_view: Child<Adw.NavigationView>(),
	_details_page: Child<DetailsPage>(),
}) {
	// readonly #settings = new Gio.Settings({ schema: pkg.app_id })

	_ready(): void {
		if (pkg.profile === "development") this.add_css_class("devel")
		SharedVars.application?.new_entry.connect("activate", this.#on_new_entry.bind(this))
	}

	#on_new_entry(): void {
		if (this._nav_view.get_visible_page_tag() === PageTags.APPS_LIST) return
		this._nav_view.push_by_tag(PageTags.APPS_LIST)
	}

	protected _on_entry_clicked(_page: EntriesPage, entry: AutostartEntry): void {
		this._details_page.entry = entry
		this._nav_view.push_by_tag(PageTags.DETAILS)
	}

	protected _on_app_clicked(_page: AppsListPage, entry: AutostartEntry | null): void {
		this._details_page.entry = entry
		this._nav_view.push_by_tag(PageTags.DETAILS)
	}

	protected _on_updated_entry(__: DetailsPage): void {
		this._nav_view.pop_to_tag(PageTags.ENTRIES)
	}

	protected _on_created_entry(__: DetailsPage, entry: AutostartEntry | null): void {
		if (entry) add_toast(_(`Created ${entry.name}`))
		this._nav_view.pop_to_tag(PageTags.ENTRIES)
	}

	protected _on_trashed_entry(__: DetailsPage, entry: AutostartEntry | null): void {
		if (entry) add_toast(_(`Trashed ${entry.name}`))
		this._nav_view.pop_to_tag(PageTags.ENTRIES)
	}
}
