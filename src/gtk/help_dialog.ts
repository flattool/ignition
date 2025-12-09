import { SharedVars } from "../utils/shared_vars.js"

import GObject from "gi://GObject?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

export class HelpDialog extends Adw.Dialog {
	static {
		GObject.registerClass({
			GTypeName: "HelpDialog",
			Template: "resource:///io/github/flattool/Ignition/gtk/help-dialog.ui",
			InternalChildren: [
				"navigation_view",
				"base_page",
				"header_bar",
				"status_page",
				"find_app_row",
				"system_entry_row",
				"find_app_page",
				"system_entry_page",
			],
		}, this)
	}

	declare readonly _navigation_view: Adw.NavigationView
	declare readonly _base_page: Adw.NavigationPage
	declare readonly _header_bar: Adw.HeaderBar
	declare readonly _status_page: Adw.StatusPage
	declare readonly _find_app_row: Adw.ActionRow
	declare readonly _system_entry_row: Adw.ActionRow
	declare readonly _find_app_page: Adw.NavigationPage
	declare readonly _system_entry_page: Adw.NavigationPage

	constructor(params?: Adw.Dialog.ConstructorProps) {
		super(params)

		this._find_app_row.connect("activated", () => this._navigation_view.push(this._find_app_page))
		this._system_entry_row.connect("activated", () => this._navigation_view.push(this._system_entry_page))

		this._find_app_row.visible = SharedVars.is_flatpak
		const scrolled_window = this._status_page.get_first_child() as Gtk.ScrolledWindow | null
		scrolled_window?.get_vadjustment().connect(
			"value-changed",
			(adj) => this._header_bar.show_title = adj.value > 0,
		)
	}
}
