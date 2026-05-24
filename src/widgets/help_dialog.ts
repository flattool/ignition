import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"

import { GClass, Property, Child, from } from "../2gobjectify/gobjectify.js"
import { SharedVars } from "../utils/shared_vars.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/widgets/help_dialog.ui" })
export class HelpDialog extends from(Adw.Dialog, {
	show_find_app: Property.const.bool(SharedVars.is_flatpak),
	show_title: Property.readwrite.bool(),
	_status_page: Child<Adw.StatusPage>(),
}) {
	constructor(params?: typeof HelpDialog.$params) {
		super(params)
		const scroll: Gtk.Widget | null = this._status_page.get_first_child()
		if (scroll instanceof Gtk.ScrolledWindow) {
			scroll.get_vadjustment().connect("value-changed", (adj: Gtk.Adjustment) => this.show_title = adj.value > 0)
		}
	}
}
