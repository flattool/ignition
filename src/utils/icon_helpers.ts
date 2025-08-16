import Gio from "gi://Gio?version=2.0"
import Gdk from "gi://Gdk?version=4.0"
import Gtk from "gi://Gtk?version=4.0"

import { SharedVars } from "./shared_vars.js"

const FALLBACK_ICON_NAME = "application-x-executable-symbolic"
const ICON_SEARCH_PATHS = [
	"/run/host/usr/share/pixmaps",
	"/var/lib/flatpak/exports/share/applications",
	"/var/lib/flatpak/exports/share/icons",
	`${SharedVars.data_home}/flatpak/exports/share/applications`,
	`${SharedVars.data_home}/flatpak/exports/share/icons`,
]

let _icon_theme: Gtk.IconTheme | undefined

export function get_icon_theme(): Gtk.IconTheme {
	if (_icon_theme) return _icon_theme

	const display = Gdk.Display.get_default()
	if (!display) throw new Error("get_icon_theme: Gdk.Display.get_default returned null")
	const theme = Gtk.IconTheme.get_for_display(display)
	ICON_SEARCH_PATHS.forEach((path) => theme.add_search_path(path))
	_icon_theme = theme
	return _icon_theme
}

export function set_icon(image: Gtk.Image, icon_string = ""): void {
	if (!icon_string) {
		image.icon_name = FALLBACK_ICON_NAME
		return
	}
	if (get_icon_theme().has_icon(icon_string)) {
		image.icon_name = icon_string
		return
	}
	const file = Gio.File.new_for_path(icon_string)
	if (file.query_exists(null) && file.query_file_type(null) === Gio.FileType.REGULAR) {
		image.set_from_file(icon_string)
		return
	}
	image.icon_name = FALLBACK_ICON_NAME
}
