const { GObject, Gtk, Adw } = imports.gi;
import { Async } from "../utils/async.js";
import { Signal } from "../utils/signal.js";
import { EntryRow } from "./entry_row.js";

export const EntryGroup = GObject.registerClass({
	GTypeName: 'EntryGroup',
	Template: 'resource:///io/github/flattool/Ignition/gtk/entry-group.ui',
	InternalChildren: [
		'group',
		'list_box',
	],
}, class EntryGroup extends Gtk.Box {
	any_results = true;
	on_results = (has_any) => {
		// I exist to be overwritten outside
		this.visible = has_any;
	};
	signals = {
		row_clicked: new Signal(),
		finished_loading: new Signal(),
	};

	constructor() {
		super(...arguments);

		this._list_box.set_sort_func((row1, row2) => (
			row1.sort_last === row2.sort_last
			? row1.title.toLowerCase() > row2.title.toLowerCase()
			: row1.sort_last
		));
	}

	search_changed(value) {
		this.any_results = false;
		for (const row of this._list_box) {
			const is_match = (
				row.title.toLowerCase().includes(value)
				|| row.subtitle.toLowerCase().includes(value)
			);
			row.visible = is_match;
			if (is_match) this.any_results = true;
		}
		this.visible = this.any_results;
	}

	load_entries(list) {
		this._list_box.remove_all();
		this.any_results = list.length > 0;
		this.on_results(this.any_results);
		if (!this.any_results) {
			this.signals.finished_loading.emit(this);
			return;
		}
		const iteration = () => {
			const [entry, ...rest] = list;
			if (entry === undefined) {
				return Async.BREAK;
			}
			list = rest;
			const row = new EntryRow(entry, true);
			row.connect('activated', () => this.signals.row_clicked.emit(row));
			this._list_box.append(row);
			return Async.CONTINUE;
		}
		Async.run(iteration, () => this.signals.finished_loading.emit(this));
	}
});
