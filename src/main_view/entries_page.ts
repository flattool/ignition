import { EntryGroup } from "../gtk/entry_group.js";
import { EntryRow } from "../gtk/entry_row.js";
import { HelpDialog } from "../gtk/help_dialog.js";
import { Async, AsyncResult } from "../utils/async.js";
import { AutostartEntry } from "../utils/autostart_entry.js";
import { DirWatcher } from "../utils/dir_watcher.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Signal } from "../utils/signal.js";
import { add_error_toast, entry_iteration } from "../utils/helper_funcs.js";

import GObject from "gi://GObject?version=2.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";

export class EntriesPage extends Adw.NavigationPage {
	static {
		GObject.registerClass({
			GTypeName: "EntriesPage",
			Template: "resource:///io/github/flattool/Ignition/main_view/entries-page.ui",
			InternalChildren: [
				"help_button",
				"search_button",
				"search_bar",
				"search_entry",
				"stack",
				"loading_status",
				"no_results_status",
				"scrolled_window",
				"home_group",
				"root_group",
				"add_button",
				"empty_row",
				"help_dialog",
			],
		}, this);
	}

	readonly _help_button!: Gtk.Button;
	readonly _search_button!: Gtk.ToggleButton;
	readonly _search_bar!: Gtk.SearchBar;
	readonly _search_entry!: Gtk.SearchEntry;
	readonly _stack!: Gtk.Stack;
	readonly _loading_status!: Adw.StatusPage;
	readonly _no_results_status!: Adw.StatusPage;
	readonly _scrolled_window!: Gtk.ScrolledWindow;
	readonly _home_group!: EntryGroup;
	readonly _root_group!: EntryGroup;
	readonly _add_button!: Gtk.Button;
	readonly _empty_row!: Adw.ActionRow;
	readonly _help_dialog!: Adw.Dialog;

	#loaded_groups: EntryGroup[] = [];

	home_watcher;
	root_watcher;
	loaded_once = false;
	signals = {
		row_clicked: new Signal<[EntryRow, Boolean]>(),
	};

	get any_results() {
		return (
			this._home_group.any_results
			|| this._root_group.any_results
		);
	}

	constructor() {
		super(...arguments);

		this._stack.connect("notify::visible-child", () => {
			const are_entries_showing = (
				this._stack.visible_child === this._scrolled_window
				|| this._stack.visible_child === this._no_results_status
			);
			if (!are_entries_showing) {
				this._search_button.active = false;
			}
			this._search_button.sensitive = are_entries_showing;
		});

		this._home_group.signals.finished_loading.connect(group => this.#on_group_finished_loading(group));
		this._home_group.signals.row_clicked.connect(row => this.signals.row_clicked.emit(row, false));
		this._home_group._group.title = _("User Startup Entries");
		this._home_group._group.description = _("Entries that run only for you.");
		this._home_group._group.header_suffix = this._add_button;
		this._home_group._group.add(this._empty_row);
		this._home_group._group.separate_rows = true;

		let empty_row_is_in_ui = true;
		this._home_group.on_results = (has_any) => {
			this._home_group._list_box.visible = has_any;
			// I can't just set empty_row's visibility, because it being added to the
			//   preference group would produce a double shadow when set invisible
			//   so we must remove and re-add it instead
			// The empty_row_is_in_ui check needs to happen because GTK complains when
			//   you try to remove a widget that has already been remove
			if (has_any && empty_row_is_in_ui) {
				this._home_group._group.remove(this._empty_row);
				empty_row_is_in_ui = false;
			} else if (!has_any && !empty_row_is_in_ui) {
				this._home_group._group.add(this._empty_row);
				empty_row_is_in_ui = true;
			}
		};

		this._root_group.signals.finished_loading.connect(group => this.#on_group_finished_loading(group));
		this._root_group.signals.row_clicked.connect(row => this.signals.row_clicked.emit(row, true));
		this._root_group._group.title = _("System Startup Entries");
		this._root_group._group.description = _("Entries that run for everyone.");

		this._search_entry.connect("search-changed", () => this.on_search_changed());

		this.home_watcher = new DirWatcher(SharedVars.home_autostart_dir, 120);
		this.home_watcher.event.connect(() => Async.run_pipe(this.load_entries()));

		this.root_watcher = new DirWatcher(SharedVars.root_autostart_dir, 120);
		this.root_watcher.event.connect(() => Async.run_pipe(this.load_entries()));

		this._help_button.connect("clicked", () => this._help_dialog.present(SharedVars.main_window));
	}

	#on_group_finished_loading(group: EntryGroup): void {
		this.#loaded_groups.push(group);
		if (
			this.#loaded_groups.includes(this._root_group)
			&& this.#loaded_groups.includes(this._home_group)
		) {
			this._stack.visible_child = this._scrolled_window;
		}
	}

	show_entries_if_any(): void {
		this._stack.visible_child = (this.any_results
			? this._scrolled_window
			: this._no_results_status
		);
	}

	on_search_changed(): void {
		const text = this._search_entry.text.toLowerCase();
		this._home_group.search_changed(text);
		this._root_group.search_changed(text);
		if (text === "") {
			// This is needed to combat the home_group hiding itself when there are no entries in the home at all
			this._home_group.any_results = true;
			this._home_group.visible = true;
		}
		this.show_entries_if_any();
	}

	load_entries(): (() => AsyncResult)[] {
		const root_map = new Map<string, AutostartEntry>(); // File name -> entry object
		const home_entries: AutostartEntry[] = [];
		const fails: string[] = [];
		const home_enumerator = SharedVars.home_autostart_dir.enumerate_children(
			"standard::*",
			Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
			null,
		);
		const to_return: (() => AsyncResult)[] = [
			() => entry_iteration(
				SharedVars.home_autostart_dir,
				home_enumerator,
				(entry: AutostartEntry) => {
					const found = root_map.get(entry.file_name);
					if (found) {
						found.overridden = AutostartEntry.Overrides.OVERRIDDEN;
						entry.overridden = AutostartEntry.Overrides.OVERRIDES;
					}
					home_entries.push(entry);
				},
				(err: unknown, path: string) => fails.push(`${err}:\n${path}`),
			),
			() => {
				// When done
				if (fails.length > 0 && !this.loaded_once) {
					add_error_toast(
						_("Could not load some entries"),
						fails.join("\n\n"),
					);
				}
				this.loaded_once = true;
				this._root_group.load_entries([...root_map.values()]);
				this._home_group.load_entries(home_entries);
				return Async.BREAK;
			},
		];
		if (!SharedVars.root_autostart_dir.query_exists(null)) {
			return to_return;
		}
		const root_enumerator = SharedVars.root_autostart_dir.enumerate_children(
			"standard::*",
			Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
			null,
		);
		return [
			() => entry_iteration(
				SharedVars.root_autostart_dir,
				root_enumerator,
				(entry: AutostartEntry) => root_map.set(entry.file_name, entry),
				(err: unknown, path: string) => fails.push(`${err}:\n${path}`),
			),
			...to_return,
		];
	}
}
