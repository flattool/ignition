import Adw from "gi://Adw?version=1"

import { GClass, Property, from } from "../gobjectify/gobjectify.js"

import { AutostartEntry } from "../utils/autostart_entry.js"
import { SharedVars } from "../utils/shared_vars.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/details_page.ui" })
export class DetailsPage extends from(Adw.NavigationPage, {
	entry: Property.gobject(AutostartEntry),
}) {
	protected _is_root(): boolean {
		if (!this.entry) return false
		return this.entry.path.includes(SharedVars.root_autostart_dir.get_path() ?? "")
	}
}
