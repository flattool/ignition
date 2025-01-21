import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import { Config } from './const.js';


const keyfile_tryer = (func) => {
	try {
		return func() || null;
	} catch (error) {
		return null;
	}
}
export class KeyFileUtils {
	static get_string_safe(keyfile, use_locale, group, key, fallback) {
		const func = (use_locale
			? keyfile.get_locale_string.bind(keyfile, group, key, null)
			: keyfile.get_string.bind(keyfile, group, key)
		)
		return keyfile_tryer(func) || fallback;
	}

	static get_boolean_safe(keyfile, group, key, fallback) {
		const func = keyfile.get_boolean.bind(keyfile, group, key);
		return keyfile_tryer(func) || fallback;
	}

	static get_int64_safe(keyfile, group, key, fallback) {
		const func = keyfile.get_int64.bind(keyfile, group, key);
		return keyfile_tryer(func) || fallback;
	}
}



const home_path = GLib.get_home_dir();
const home_dir = Gio.File.new_for_path(home_path);
const autostart_path = (GLib.getenv("HOST_XDG_CONFIG_HOME") || `${home_path}/.config`) + "/autostart/";
const autostart_dir = Gio.File.new_for_path(autostart_path);
const is_sandboxed = GLib.getenv("FLATPAK_ID") === Config.APP_ID;
export class SharedVars {
	static get autostart_path() {
		return autostart_path;
	}

	static get autostart_dir() {
		return autostart_dir;
	}

	static get home_path() {
		return home_path;
	}

	static get home_dir() {
		return home_dir ;
	}

	static get is_sandboxed() {
		return is_sandboxed;
	}
	static main_window = null; // set in main
}



let host_icon_theme = null; // set in the get host_icon_theme func
export class IconUtils {
	static get host_icon_theme() {
		if(host_icon_theme === null) {
			host_icon_theme = Gtk.IconTheme.get_for_display(SharedVars.main_window.get_display());
			host_icon_theme.add_search_path("/run/host/usr/share/icons");
			host_icon_theme.add_search_path("/run/host/usr/share/pixmaps");
			host_icon_theme.add_search_path((GLib.getenv("HOST_XDG_DATA_HOME") || home_path) + "/.local/share/flatpak/exports/share/applications");
			host_icon_theme.add_search_path((GLib.getenv("HOST_XDG_DATA_HOME") || home_path) + "/.local/share/flatpak/exports/share/icons");
			host_icon_theme.add_search_path("/var/lib/flatpak/exports/share/applications");
			host_icon_theme.add_search_path("/var/lib/flatpak/exports/share/icons");
		}
		return host_icon_theme;
	}

	static set_icon(image, icon_string) {
		if (!icon_string) {
			image.icon_name = "ignition:application-x-executable-symbolic";
		} else if (this.host_icon_theme.has_icon(icon_string)) {
			image.icon_name = icon_string;
		} else if (Gio.File.new_for_path(icon_string).query_exists(null)) {
			image.set_from_file(icon_string);
		} else {
			image.icon_name = "ignition:application-x-executable-symbolic";
		}
	}
}



export class Signal {
	emit(argument) {
		for (const func of this.connections) {
			func(argument);
		}
	}

	connect(func) {
		this.connections.push(func);
	}

	disconnect(func) {
		this.connections = this.connections.filter((connection) => {
			return connection !== func;
		})
	}

	connections = [];
}



export const run_async = (to_run, when_done) => {
	GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
		const should_continue = to_run();
		if (should_continue) {
			return GLib.SOURCE_CONTINUE;
		}

		when_done();
		return GLib.SOURCE_REMOVE;
	});
};
