import { Config } from "../config.js";

import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";

export class SharedVars {
	static main_window?: Gtk.Window; // Set in main.js
	static application?: Adw.Application; // Set in main.js

	static is_flatpak = GLib.getenv("FLATPAK_ID") === Config.APP_ID;
	static home_dir = Gio.File.new_for_path(GLib.get_home_dir());

	// These need to be getters for the _() translation function to work
	static get default_name(): string { return _("No Name Set"); }
	static get default_comment(): string { return _("No comment set."); }

	// main.js will make this dir if it does not exist
	static home_autostart_dir = Gio.File.new_for_path((
		GLib.getenv("HOST_XDG_CONFIG_HOME")
		|| `${SharedVars.home_dir.get_path()}/.config`
	) + "/autostart");

	static root_autostart_dir = (SharedVars.is_flatpak
		? Gio.File.new_for_path("/run/host/etc/xdg/autostart")
		: Gio.File.new_for_path("/etc/xdg/autostart")
	);

	static host_app_entry_dirs = [
		Gio.File.new_for_path(( // distro apps 1
			SharedVars.is_flatpak
			? "/run/host"
			: ""
		) + "/usr/local/share/applications"),
		Gio.File.new_for_path(( // distro apps 2
			SharedVars.is_flatpak
			? "/run/host"
			: ""
		) + "/usr/share/applications"),
		Gio.File.new_for_path( // snaps
			"/var/lib/snapd/desktop/applications"
		),
		Gio.File.new_for_path( // system flatpaks
			"/var/lib/flatpak/exports/share/applications"
		),
		Gio.File.new_for_path(( // user flatpaks
			GLib.getenv("HOST_XDG_DATA_HOME")
			|| SharedVars.home_dir.get_path() + "/.local/share"
		) + "/flatpak/exports/share/applications"),
		Gio.File.new_for_path(( // user apps
			GLib.getenv("HOST_XDG_DATA_HOME")
			|| SharedVars.home_dir.get_path() + "/.local/share"
		) + "/applications"),
	];
}
