const { GLib, Gio, Gdk, Gtk, Adw } = imports.gi;
import { AutostartEntry } from "./autostart_entry.js";

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

export const add_error_toast = (window, title, message) => {
	const label = new Gtk.Label({
		selectable: true,
		wrap: true,
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
}

export const get_entries_in = (dir, for_entry = () => true) => {
	// for_dir will run for each entry, and if it returns false, will skip that entry
	const entries = [];
	const failed_loads = [];

	const enumerator = dir.enumerate_children(
		'standard::*',
		Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
		null,
	);
	const base_path = dir.get_path();
	if (!base_path) {
		return [entries, failed_loads];
	}

	for (const file_info of enumerator) {
		const name = file_info.get_name();
		if (!name.endsWith('.desktop')) {
			continue;
		}

		const path = `${base_path}/${name}`;
		try {
			const entry = new AutostartEntry(path);
			if (for_entry(entry)) {
				entries.push(entry);
			}
		} catch (error) {
			failed_loads.push(path);
			logError(error, `Failed to load autostart entry: ${path}`);
		}
	}
	return [entries, failed_loads];
}
