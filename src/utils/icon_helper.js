import { SharedVars } from "./shared_vars.js";

const { GLib, Gio, Gdk, Gtk } = imports.gi;

export class IconHelper {
	static #icon_theme = null;

	static get icon_theme() {
		if (this.#icon_theme !== null) {
			return this.#icon_theme;
		}
		// SharedVars.main_window.get_display()
		const theme = Gtk.IconTheme.get_for_display(Gdk.Display.get_default());
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
		IconHelper.#icon_theme = theme;
		return IconHelper.#icon_theme;
	}

	static set_icon(image, icon_string="") {
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
