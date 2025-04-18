const { GLib, Gio, Gdk, Gtk, Adw, Pango } = imports.gi;
import { AutostartEntry } from "./autostart_entry.js";
import { Async } from "./async.js";

export const add_error_toast = (window, title, message) => {
	const label = new Gtk.Label({
		selectable: true,
		wrap: true,
		wrap_mode: Pango.WrapMode.WORD_CHAR,
	});
	label.set_markup(`<tt>${GLib.markup_escape_text(`${message}`, -1)}</tt>`)
	const error_dialog = new Adw.AlertDialog({
		heading: title,
		extra_child: label,
	});
	error_dialog.add_response('copy', _("Copy"));
	error_dialog.add_response('ok', _("OK"));
	error_dialog.connect('response', (__, response) => {
		if (response !== 'copy') {
			return;
		}
		const clipboard = Gdk.Display.get_default().get_clipboard();
		clipboard.set(message);
	})
	const toast = new Adw.Toast({
		title: title,
		button_label: _("Details"),
	});
	toast.connect('button-clicked', () => error_dialog.present(window));
	window._toast_overlay.add_toast(toast);
	print("==== Error Toast ====");
	print(title);
	print(message);
	print("=====================");
};

// Run me as async!
export const entry_iteration = (dir, enumerator, on_found, on_error) => {
	const file = enumerator.next_file(null);
	if (file === null) {
		// Stop the loop when there are no more files
		return Async.BREAK;
	}
	const name = file.get_name();
	const path = `${dir.get_path()}/${name}`;
	if (!path.endsWith('.desktop')) {
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
