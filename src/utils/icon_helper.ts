import GLib from "gi://GLib?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import Gio from "gi://Gio?version=2.0"

import { SharedVars } from "./shared_vars.js"

let _icon_theme: Gtk.IconTheme | undefined

export const IconHelper = {
	get icon_theme(): Gtk.IconTheme {
		if (_icon_theme) return _icon_theme
		const theme = Gtk.IconTheme.get_for_display(Gdk.Display.get_default() ?? new Gdk.Display())
		theme.add_search_path("/usr/share/icons")
		theme.add_search_path("/usr/share/pixmaps")
		theme.add_search_path("/run/host/usr/share/icons")
		theme.add_search_path("/run/host/usr/share/pixmaps")
		theme.add_search_path("/var/lib/flatpak/exports/share/applications")
		theme.add_search_path("/var/lib/flatpak/exports/share/icons")
		theme.add_search_path((
			GLib.getenv("HOST_XDG_DATA_HOME")
			|| (SharedVars.home_dir.get_path() + "/.local/share")
		) + "/flatpak/exports/share/applications")
		theme.add_search_path((
			GLib.getenv("HOST_XDG_DATA_HOME")
			|| (SharedVars.home_dir.get_path() + "/.local/share")
		) + "/flatpak/exports/share/icons")
		_icon_theme = theme
		return theme
	},

	set_icon(image: Gtk.Image, icon = ""): void {
		if (icon === "") {
			image.icon_name = "ignition:application-x-executable-symbolic"
		} else if (this.icon_theme.has_icon(icon)) {
			image.icon_name = icon
		} else if (Gio.File.new_for_path(icon).query_exists(null)) {
			image.set_from_file(icon)
		} else {
			image.icon_name = "ignition:application-x-executable-symbolic"
		}
	},
}
