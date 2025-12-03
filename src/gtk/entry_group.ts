import { EntryRow } from "./entry_row.js";
import { Async } from "../utils/async.js";
import { AutostartEntry } from "src/utils/autostart_entry.js";
import { Signal } from "../utils/signal.js";

import GObject from "gi://GObject?version=2.0";
import Gdk from "gi://Gdk?version=4.0";
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
		reordered: new Signal<[EntryRow, number]>(),
	} as const;

	#dragged_row: EntryRow | null = null;

	constructor(params?: Adw.PreferencesGroup.ConstructorProps) {
		super(params);
	}

	#setup_drag_and_drop(row: EntryRow): void {
		// Set up the row as a drag source
		const drag_source = new Gtk.DragSource({
			actions: Gdk.DragAction.MOVE,
		});

		drag_source.connect("prepare", (_source, _x, _y) => {
			this.#dragged_row = row;
			return Gdk.ContentProvider.new_for_value(row);
		});

		drag_source.connect("drag-begin", (_source, drag) => {
			const drag_widget = new Gtk.ListBox();
			drag_widget.add_css_class("boxed-list");
			const drag_row = new EntryRow(row.entry, true);
			drag_widget.append(drag_row);
			drag_widget.drag_highlight_row(drag_row);

			const icon = Gtk.DragIcon.get_for_drag(drag) as Gtk.DragIcon;
			icon.set_child(drag_widget);

			row.add_css_class("drag-active");
		});

		drag_source.connect("drag-end", () => {
			row.remove_css_class("drag-active");
			this.#dragged_row = null;
		});

		row.add_controller(drag_source);

		// Set up the row as a drop target
		const drop_target = new Gtk.DropTarget({
			actions: Gdk.DragAction.MOVE,
		});
		drop_target.set_gtypes([EntryRow.$gtype]);

		drop_target.connect("drop", (_target, value, _x, y) => {
			const source_row = value as unknown as EntryRow;
			if (source_row === row) {
				return false;
			}

			const row_height = row.get_height();
			const drop_after = y > row_height / 2;

			// Get the current position of the target row
			const target_index = row.get_index();
			const source_index = source_row.get_index();

			// Remove the source row and insert it at the new position
			this._list_box.remove(source_row);

			let new_index = drop_after ? target_index : target_index;
			if (source_index < target_index) {
				new_index = drop_after ? target_index : target_index - 1;
			}

			this._list_box.insert(source_row, new_index);

			this.signals.reordered.emit(source_row, new_index);
			return true;
		});

		row.add_controller(drop_target);
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
			this.#setup_drag_and_drop(row);
			this._list_box.append(row);
			return Async.CONTINUE;
		}
		Async.run(iteration, () => this.signals.finished_loading.emit(this));
	}
}
