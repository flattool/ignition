import { EntryRow } from "../gtk/entry_row.js";
import { Async, AsyncResult } from "../utils/async.js";
import { AutostartEntry } from "src/utils/autostart_entry.js";
import { KeyFileHelper } from "../utils/key_file_helper.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Signal } from "../utils/signal.js";
import { add_error_toast, host_app_iteration } from "../utils/helper_funcs.js";

import GObject from "gi://GObject?version=2.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";

export class AppListPage extends Adw.NavigationPage {
	static {
		GObject.registerClass({
			GTypeName: "AppListPage",
			Template: "resource:///io/github/flattool/Ignition/main_view/app-list-page.ui",
			InternalChildren: [
				"header_bar",
					"search_button",
				"search_bar",
					"search_entry",
				"stack",
					"scrolled_window",
						"script_group",
							"script_row",
						"apps_group",
							"show_hidden_switch",
						"list_box",
					"no_results_status",
			],
		}, this);
	}

	readonly _header_bar!: Adw.HeaderBar;
	readonly _search_button!: Gtk.ToggleButton;
	readonly _search_bar!: Gtk.SearchBar;
	readonly _search_entry!: Gtk.SearchEntry;
	readonly _stack!: Gtk.Stack;
	readonly _scrolled_window!: Gtk.ScrolledWindow;
	readonly _script_group!: Adw.PreferencesGroup;
	readonly _script_row!: Adw.ActionRow;
	readonly _apps_group!: Adw.PreferencesGroup;
	readonly _show_hidden_switch!: Gtk.Switch;
	readonly _list_box!: Gtk.ListBox;
	readonly _no_results_status!: Adw.StatusPage;

	signals = {
		script_chosen: new Signal(),
		app_chosen: new Signal<[AutostartEntry]>(),
	} as const;

	constructor(params?: Adw.NavigationPage.ConstructorProps) {
		super(params);

		this._list_box.set_sort_func((row1, row2) => {
			const entry_row1 = row1 as EntryRow;
			const entry_row2 = row2 as EntryRow;
			return (entry_row1.sort_priority === entry_row2.sort_priority
				? +(entry_row1.title.toLowerCase() > entry_row2.title.toLowerCase())
				: +(entry_row1.sort_priority < entry_row2.sort_priority)
			);
		});

		this._search_entry.connect("search-changed", () => this.on_search_changed());
		this._show_hidden_switch.connect("notify::active", () => this.on_search_changed());
		this._script_row.connect("activated", () => this.signals.script_chosen.emit());
	}

	scroll_to_top(): void {
		this._scrolled_window.get_vadjustment().value = 0;
	}

	is_entry_hidden(entry: AutostartEntry): boolean {
		return (
			KeyFileHelper.get_boolean_safe(entry.keyfile, "Desktop Entry", "Hidden", false)
			|| KeyFileHelper.get_boolean_safe(entry.keyfile, "Desktop Entry", "NoDisplay", false)
		);
	}

	on_search_changed(): void {
		const text = this._search_entry.text.toLowerCase();
		let any_visible = false;
		for (const row of this._list_box) {
			const entry_row = row as EntryRow;
			if (Gio.File
				.new_for_path(`${SharedVars.home_autostart_dir.get_path()}/${entry_row.entry.file_name}`)
				.query_exists(null)
			) {
				row.visible = false;
				continue;
			}
			if (this.is_entry_hidden(entry_row.entry) && !this._show_hidden_switch.active) {
				row.visible = false;
				continue;
			}
			if (
				entry_row.title.toLowerCase().includes(text)
				|| entry_row.subtitle.toLowerCase().includes(text)
			) {
				row.visible = true;
				any_visible = true;
			} else {
				row.visible = false;
			}
		}
		this._stack.visible_child = any_visible ? this._scrolled_window : this._no_results_status;
	}

	load_app_iterations_builder(): (() => AsyncResult)[] {
		const fails: string[] = [];
		const tasks = (SharedVars.host_app_entry_dirs
			.filter(file => file.query_exists(null))
			.map(dir => host_app_iteration(
				dir,
				(entry: AutostartEntry) => {
					const home_path = `${SharedVars.home_autostart_dir.get_path()}/${entry.file_name}`;
					const row = new EntryRow(entry, false);
					row.connect("activated", () => this.signals.app_chosen.emit(entry));
					if (!this._show_hidden_switch.active && this.is_entry_hidden(entry)) {
						row.visible = false;
					}
					this._list_box.append(row);
				},
				(err: unknown, path: string) => fails.push(`${err}:\n${path}`),
			))
		);
		return [
			...tasks,
			() => {
				// When done
				if (fails.length > 0) {
					add_error_toast(
						_("Could not load some apps"),
						fails.join("\n\n"),
					);
				}
				return Async.BREAK;
			},
		];
	}
}
