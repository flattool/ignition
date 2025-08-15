import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

import { GObjectify } from "../utils/gobjectify.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/gtk/loading_group" })
export class LoadingGroup extends Adw.Bin {
	@GObjectify.Property("string")
	public accessor title!: string

	@GObjectify.Property("string")
	public accessor description!: string

	@GObjectify.Property(Gtk.Widget)
	public accessor content!: Gtk.Widget

	@GObjectify.Property("bool")
	public accessor loading!: boolean

	protected _get_visible_page(): "loading_page" | "content_page" {
		return !this.loading ? "loading_page" : "content_page"
	}
}
