const { GObject, Gtk, Adw } = imports.gi;
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
	signals = {
		row_clicked: new Signal(),
	};

	constructor() {
		super(...arguments);

		this._list_box.connect('row-activated', row => this.signals.row_clicked.emit(row));
		this._list_box.set_sort_func((row1, row2) => (
			row1.entry.enabled === row2.entry.enabled
			? row1.title.toLowerCase() > row2.title.toLowerCase()
			: row2.entry.enabled
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
		list.forEach(entry => this._list_box.append(new EntryRow(entry, true)));
		this.visible = list.length > 0;
	}
});
