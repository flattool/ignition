const { GObject, Gio, Adw } = imports.gi;
import { add_error_toast, entry_iteration } from "../utils/helper_funcs.js";
import { SharedVars } from "../utils/shared_vars.js";
import { EntriesPage } from "./entries_page.js";
import { EntryGroup } from "../gtk/entry_group.js";
import { AutostartEntry } from "../utils/autostart_entry.js";
import { Async } from "../utils/async.js";

export const MainView = GObject.registerClass({
	GTypeName: 'MainView',
	Template: 'resource:///io/github/flattool/Ignition/main_view/main-view.ui',
	InternalChildren: [
		'search_button',
		'search_bar',
			'search_entry',
		'stack',
			'loading_status',
			'no_entries_status',
				'no_entries_new_button',
			'no_results_status',
			'navigation_view',
				'entries_page',
				// 'choices_page',
				// 'app_list_page',
				// 'details_page',
	],
}, class MainView extends Adw.Bin {
	constructor() {
		super(...arguments);

		this._search_entry.connect('search-changed', () => this.on_search_changed());
		this._stack.connect('notify::visible_child', () => {
			const are_entries_showing = (
				this._stack.visible_child === this._navigation_view
				|| this._stack.visible_child === this._no_results_status
			);
			if (!are_entries_showing) {
				this._search_button.active = false;
			}
			this._search_button.sensitive = are_entries_showing;
		});
		this._entries_page.signals.finished_loading.connect(() => this.show_entries_if_any());

		this._stack.visible_child = this._loading_status;
	}

	show_entries_if_any() {
		this._stack.visible_child = (this._entries_page.any_results
			? this._navigation_view
			: this._no_results_status
		);
	}

	on_search_changed() {
		const text = this._search_entry.text.toLowerCase();
		this._entries_page.search_changed(text);
		this.show_entries_if_any();
	}

	load_entries() {
		this._stack.visible_child = this._loading_status;
		this._entries_page.load_entries();
	}
});
