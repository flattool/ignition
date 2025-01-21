import GObject from 'gi://GObject';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import { KeyFileUtils, run_async, SharedVars, Signal } from './utils.js';
import { EntryRow } from './entry_row.js';
import { AutostartEntry } from './autostart_entry.js';

const host_app_dirs = [
	Gio.File.new_for_path(( // distro apps 1
		SharedVars.is_sandboxed
		? "/run/host"
		: ""
	) + "/usr/local/share/applications"),
	Gio.File.new_for_path(( // distro apps 2
		SharedVars.is_sandboxed
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
		|| SharedVars.home_path + "/.local/share"
	) + "/flatpak/exports/share/applications"),
	Gio.File.new_for_path(( // user apps
		GLib.getenv("HOST_XDG_DATA_HOME")
		|| SharedVars.home_path + "/.local/share"
	) + "/applications"),
];

const dirs_with_enumerators = [];
for (const file of host_app_dirs) {
	if (!file.query_exists(null)) {
		continue;
	}
	dirs_with_enumerators.push(
		{
			path: file.get_path(),
			enumerator: file.enumerate_children(
				'standard::*', Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, null
			),
		}
	);
}

export const AppChooserPage = GObject.registerClass({
	GTypeName: 'AppChooserPage',
	Template: 'resource:///io/github/flattool/Ignition/gtk/app-chooser-page.ui',
	InternalChildren: [
		"search_button",
		"search_bar",
			"search_entry",
		"stack",
			"scrolled_window",
				"clamp",
					"apps_list_box",
			"no_results_status",
	],
}, class AppChooserPage extends Adw.NavigationPage {
	get_host_apps(callback) {
		if (dirs_with_enumerators.length === 0) {
			callback();
			return;
		}
		this._apps_list_box.remove_all();
		let index = 0;
		let total_rows = 0;
		let dir_with_enumerator = dirs_with_enumerators[index];
		const failed_entries = [];
		const iteration = () => {
			const folder_path = dir_with_enumerator.path;
			const enumerator = dir_with_enumerator.enumerator;
			const info = enumerator.next_file(null);
			if (info === null) {
				index += 1;

				// Stop the loop when there are no more dirs left
				if (index >= dirs_with_enumerators.length) {
					return false;
				}

				// Skip this iteration so the next one gets the next enumerator
				dir_with_enumerator = dirs_with_enumerators[index];
				return true;
			}
			if (!info.get_name().endsWith(".desktop")) {
				// Skip this iteration if the file is not a .desktop file
				return true;
			}
			const file_path = `${folder_path}/${info.get_name()}`;
			let entry;
			try {
				entry = new AutostartEntry(file_path);
				const hidden = (
					KeyFileUtils.get_boolean_safe(entry.keyfile, "Desktop Entry", "Hidden", false)
					|| KeyFileUtils.get_boolean_safe(entry.keyfile, "Desktop Entry", "NoDisplay", false)
				);
				if (hidden) {
					return true;
				}
			} catch (error) {
				print("Ignition error: AppChooserPage: Error creating AutostartEntry");
				print("Path:", file_path);
				print("Error:", error);
				failed_entries.push(file_path);
				return true;
			}
			const row = new EntryRow(entry, false);
			this._apps_list_box.append(row);
			row.connect('activated', () => {
				this.signals.app_chosen.emit(entry);
			});
			total_rows += 1;
			return true;
		}
		run_async(
			iteration,
			() => callback(total_rows, failed_entries),
		);
	}

	signals = {
		app_chosen: new Signal(),
	}

	constructor(...args) {
		super(...args);
		this._apps_list_box.set_sort_func((row1, row2) => {
			return (
				(row1.title || row1.subtitle).toLowerCase()
				> (row2.title || row2.subtitle).toLowerCase()
			)
		});
		this.connect("showing", () => {
			this._search_button.sensitive = true;
		});
		this.connect("hidden", () => {
			this._search_button.active = false;
			this._search_button.sensitive = false;
		});
		this._search_entry.connect("search-changed", (entry) => {
			const text = entry.text.toLowerCase();
			let total_visible = 0;
			for (const row of this._apps_list_box) {
				if ((
					row.title.length > 0
					&& row.title.toLowerCase().includes(text)
				) || (
					row.subtitle.length > 0
					&& row.subtitle.toLowerCase().includes(text)
				)) {
					total_visible += 1;
					row.visible = true;
				} else {
					row.visible = false;
				}
			}
			this._stack.visible_child = (
				total_visible > 0
				? this._scrolled_window
				: this._no_results_status
			);
		});
	}
});
