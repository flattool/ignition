import GLib from "gi://GLib?version=2.0"
import Gio from "gi://Gio?version=2.0"

import type { MainWindow } from "../window/main_window.js"
import type { Application } from "../main.js"

export class SharedVars {
	public static main_window?: MainWindow
	public static application?: Application

	public static readonly is_flatpak = GLib.getenv("FLATPAK_ID") === pkg.app_id
	public static readonly home_dir = Gio.File.new_for_path(GLib.get_home_dir())

	// These need to be getters for the _() translation function to work
	public static get default_name(): string { return _("No Name Set") }
	public static get default_comment(): string { return _("No comment set.") }

	public static readonly config_home = (
		GLib.getenv("HOST_XDG_CONFIG_HOME")
		|| GLib.getenv("XDG_CONFIG_HOME")
		|| `${this.home_dir.get_path()}/.config`
	)

	public static readonly data_home = (
		GLib.getenv("HOST_XDG_CONFIG_HOME")
		|| GLib.getenv("XDG_CONFIG_HOME")
		|| `${this.home_dir.get_path()}/.local/share`
	)

	public static readonly home_autostart_dir = Gio.File.new_for_path(this.config_home + "/autostart")

	public static readonly root_autostart_dir = (this.is_flatpak
		? Gio.File.new_for_path("/run/host/etc/xdg/autostart")
		: Gio.File.new_for_path("/etc/xdg/autostart")
	)

	// The order of this array is important! Lower Files get less priority when two entries have identical execs
	public static readonly host_app_entry_dirs = [
		Gio.File.new_for_path(`${this.data_home}/applications`), // user apps
		Gio.File.new_for_path(`${this.data_home}/flatpak/exports/share/applications`), // user flatpaks
		Gio.File.new_for_path("/var/lib/flatpak/exports/share/applications"), // system flatpaks
		Gio.File.new_for_path("/var/lib/snapd/desktop/applications"), // snaps
		Gio.File.new_for_path((this.is_flatpak ? "/run/host" : "") + "/usr/local/share/applications"), // distro apps 1
		Gio.File.new_for_path((this.is_flatpak ? "/run/host" : "") + "/usr/share/applications"), // distro apps 2
	] as const
}
