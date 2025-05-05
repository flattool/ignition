import { EntryRow } from "./entry_row.js";
import { Async } from "../utils/async.js";
import { AutostartEntry } from "src/utils/autostart_entry.js";
import { Signal } from "../utils/signal.js";

import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";

export class EntryGroup extends Gtk.Box {
	static {
		GObject.registerClass({
			GTypeName: "EntryGroup",
			Template: "resource:///io/github/flattool/Ignition/gtk/entry-group.ui",
			InternalChildren: [
				"group",
				"list_box",
			],
		}, this);
	}

	readonly _group!: Adw.PreferencesGroup;
	readonly _list_box!: Gtk.ListBox;

	any_results = true;
	on_results = (has_any: boolean): void => {
		// I exist to be overwritten outside
		this.visible = has_any;
	}
	readonly signals = {
		row_clicked: new Signal<[EntryRow]>(),
		finished_loading: new Signal<[EntryGroup]>(),
	} as const;

	constructor(params?: Adw.PreferencesGroup.ConstructorProps) {
		super(params);

		this._list_box.set_sort_func((row1, row2) => {
			let entry_row1 = row1 as EntryRow;
			let entry_row2 = row2 as EntryRow;

			return (entry_row1.sort_priority === entry_row2.sort_priority
				? +(entry_row1.title.toLowerCase() > entry_row2.title.toLowerCase())
				: +(entry_row1.sort_priority < entry_row2.sort_priority)
			);
		});
	}

	search_changed(value: string): void {
		this.any_results = false;
		for (const row of this._list_box) {
			const entry_row = row as EntryRow;
			const is_match = (
				entry_row.title.toLowerCase().includes(value)
				|| entry_row.subtitle.toLowerCase().includes(value)
			);
			row.visible = is_match;
			if (is_match) {
				this.any_results = true;
			}
		}
		this.visible = this.any_results;
	}

	load_entries(list: AutostartEntry[]): void {
		this._list_box.remove_all();
		this.any_results = list.length > 0;
		this.on_results(this.any_results);
		if (!this.any_results) {
			this.signals.finished_loading.emit(this);
			return;
		}
		const iteration = () => {
			const entry = list.shift();
			if (entry === undefined) {
				return Async.BREAK;
			}
			const row = new EntryRow(entry, true);
			row.connect("activated", () => this.signals.row_clicked.emit(row));
			this._list_box.append(row);
			return Async.CONTINUE;
		}
		Async.run(iteration, () => this.signals.finished_loading.emit(this));
	}
}
