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
	#search_text = "";

	signals = {
		row_clicked: new Signal(),
	};

	get any_visible() {
		for (const row of this._list_box) {
			if (row.visible) return true;
		}
		return false;
	}

	constructor() {
		super(...arguments);

		this._list_box.connect('row-activated', row => this.signals.row_clicked.emit(row));
		this._list_box.set_sort_func((row1, row2) => row1.title.toLowerCase() > row2.title.toLowerCase());
		this._list_box.set_filter_func(row => (
			row.title.toLowerCase().includes(this.#search_text)
			|| row.subtitle.toLowerCase().includes(this.#search_text)
		));
	}

	search_changed(value) {
		this.#search_text = value;
		this._list_box.invalidate_filter();
		this.visible = this.any_visible;
	}

	load_entries(list) {
		this._list_box.remove_all();
		list.forEach(entry => this._list_box.append(new EntryRow(entry, true)));
		this.visible = list.length > 0;
	}
});
