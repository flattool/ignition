const { GLib, Gio } = imports.gi;
import { Config } from "../config.js";

export class SharedVars {
	static main_window; // Set in main.js
	static application; // Set in main.js

	static is_flatpak = GLib.getenv("FLATPAK_ID") === Config.APP_ID;
	static home_dir = Gio.File.new_for_path(GLib.get_home_dir());

	// main.js will make this dir if it does not exist
	static home_autostart_dir = Gio.File.new_for_path((
		GLib.getenv("HOST_XDG_CONFIG_HOME")
		|| `${SharedVars.home_dir.get_path()}/.config`
	) + "/autostart");

	static root_autostart_dir = (SharedVars.is_flatpak
		? Gio.File.new_for_path("/run/host/etc/xdg/autostart")
		: Gio.File.new_for_path("/etc/xdg/autostart")
	);
}
