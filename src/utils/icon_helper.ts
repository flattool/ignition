import { SharedVars } from "./shared_vars.js";

import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";
import Gdk from "gi://Gdk?version=4.0";
import Gtk from "gi://Gtk?version=4.0";

export class IconHelper {
	static #icon_theme?: Gtk.IconTheme = undefined;

	static get icon_theme(): Gtk.IconTheme {
		if (this.#icon_theme !== undefined) {
			return this.#icon_theme;
		}
		const theme = Gtk.IconTheme.get_for_display(Gdk.Display.get_default() ?? new Gdk.Display);
		theme.add_search_path("/run/host/usr/share/icons");
		theme.add_search_path("/run/host/usr/share/pixmaps");
		theme.add_search_path("/var/lib/flatpak/exports/share/applications");
		theme.add_search_path("/var/lib/flatpak/exports/share/icons");
		theme.add_search_path((
			GLib.getenv("HOST_XDG_DATA_HOME")
			|| SharedVars.home_dir.get_path()
		) + "/.local/share/flatpak/exports/share/applications");
		theme.add_search_path((
			GLib.getenv("HOST_XDG_DATA_HOME")
			|| SharedVars.home_dir.get_path()
		) + "/.local/share/flatpak/exports/share/icons");
		IconHelper.#icon_theme = theme ?? new Gtk.IconTheme();
		return IconHelper.#icon_theme;
	}

	static set_icon(image: Gtk.Image, icon_string=""): void {
		if (icon_string === "") {
			image.icon_name = "ignition:application-x-executable-symbolic";
		} else if (IconHelper.icon_theme.has_icon(icon_string)) {
			image.icon_name = icon_string;
		} else if (Gio.File.new_for_path(icon_string).query_exists(null)) {
			image.set_from_file(icon_string);
		} else {
			image.icon_name = "ignition:application-x-executable-symbolic";
		}
	}
}
