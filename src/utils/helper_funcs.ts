import { Async, AsyncResult } from "./async.js";
import { AutostartEntry } from "./autostart_entry.js";
import { SharedVars } from "./shared_vars.js";

import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";
import Gdk from "gi://Gdk?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";
import Pango from "gi://Pango?version=1.0";

export const add_toast = (title: string, window = SharedVars.main_window): void => {
	window?._toast_overlay.add_toast(Adw.Toast.new(title));
};

export const add_error_toast = (title: string, message: string, window = SharedVars.main_window): void => {
	const label = new Gtk.Label({
		selectable: true,
		wrap: true,
		wrap_mode: Pango.WrapMode.WORD_CHAR,
	});
	label.set_markup(`<tt>${GLib.markup_escape_text(message, -1)}</tt>`)
	const error_dialog = new Adw.AlertDialog({
		heading: title,
		extra_child: label,
	});
	error_dialog.add_response("copy", _("Copy"));
	error_dialog.add_response("ok", _("OK"));
	error_dialog.connect("response", (__, response) => {
		if (response !== "copy") {
			return;
		}
		Gdk.Display.get_default()?.get_clipboard().set(message);
	});
	const toast = new Adw.Toast({
		title: title,
		button_label: _("Details"),
	});
	// TODO: clean this up
	toast.connect("button-clicked", () => error_dialog.present(window));
	window?._toast_overlay.add_toast(toast);
	print("==== Error Toast ====");
	print(title);
	print(message);
	print("=====================");
};

// Run me as async!
export const entry_iteration = (
	dir: Gio.File,
	enumerator: Gio.FileEnumerator,
	on_found: (arg0: AutostartEntry) => void,
	on_error = (err: unknown, path: string) => { }
): AsyncResult => {
	const file = enumerator.next_file(null);
	if (file === null) {
		// Stop the loop when there are no more files
		return Async.BREAK;
	}
	const name = file.get_name();
	const path = `${dir.get_path()}/${name}`;
	if (!path.endsWith(".desktop")) {
		// Skip this iteration if a file that isn't a desktop entry is found
		return Async.CONTINUE;
	}
	try {
		const entry = new AutostartEntry(path);
		on_found(entry);
	} catch (error) {
		on_error(error, path);
	}
	// Continue to next async iteration
	return Async.CONTINUE;
};

// Run me as async!
export const host_app_iteration = (
	dir: Gio.File,
	on_found: (arg0: AutostartEntry) => void,
	on_error = (err: unknown, path: string): void => { },
): (() => AsyncResult) => {
	let enumerator: Gio.FileEnumerator | null = null;
	const dir_path = dir.get_path();
	return () => {
		// Lazy load the enumerator to avoid high memory usage
		if (enumerator === null) {
			enumerator = dir.enumerate_children(
				"standard::*",
				Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
				null
			);
		}
		const info = enumerator.next_file(null);
		if (info === null) {
			return Async.BREAK;
		}
		const name = info.get_name();
		if (!name.endsWith(".desktop")) {
			return Async.CONTINUE;
		}
		const path = `${dir_path}/${name}`;
		try {
			const entry = new AutostartEntry(path);
			on_found(entry);
		} catch (error: unknown) {
			on_error(error, path);
		}
		return Async.CONTINUE;
	};
}
