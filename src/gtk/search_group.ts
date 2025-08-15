import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

import { GObjectify } from "../utils/gobjectify.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/gtk/search_group" })
export class SearchGroup extends Adw.Bin {
	@GObjectify.Property(Gtk.Widget)
	public accessor content!: Gtk.Widget

	@GObjectify.Property("bool")
	public accessor no_results!: boolean

	protected _get_visible_page(): "no_results_page" | "content_page" {
		return this.no_results ? "no_results_page" : "content_page"
	}
}
