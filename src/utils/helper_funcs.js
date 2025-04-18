const { GLib, Gio, Gdk, Gtk, Adw } = imports.gi;
import { AutostartEntry } from "./autostart_entry.js";

export const run_async = (to_run, when_done = () => { }) => {
	GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
		const should_continue = to_run();
		if (should_continue) {
			return GLib.SOURCE_CONTINUE;
		}

		when_done();
		return GLib.SOURCE_REMOVE;
	});
};

export const run_async_pipe = (tasks = [], when_done = () => { }) => {
	if (tasks.length < 1) {
		when_done();
		return;
	}

	const [first_task, ...remaining] = tasks;

	run_async(
		first_task,
		() => run_async_pipe(remaining, when_done),
	);
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
};

// Run me as async!
export const entry_iteration = (dir, enumerator, on_found, on_error) => {
	const file = enumerator.next_file(null);
	if (file === null) {
		// Stop the loop when there are no more files
		return false;
	}
	const name = file.get_name();
	const path = `${dir.get_path()}/${name}`;
	if (!path.endsWith('.desktop')) {
		// Skip this iteration if a file that isn't a desktop entry is found
		return true;
	}
	try {
		const entry = new AutostartEntry(path);
		on_found(entry);
	} catch (error) {
		on_error(path);
	}
	// Continue to next async iteration
	return true;
};
