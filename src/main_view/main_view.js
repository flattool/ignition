const { GObject, Adw } = imports.gi;
import { add_error_toast, get_entries_in, run_async } from "../utils/helper_funcs.js";
import { SharedVars } from "../utils/shared_vars.js";
import { EntriesPage } from "./entries_page.js";
import { EntryGroup } from "../gtk/entry_group.js";

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

		this._stack.visible_child = this._navigation_view;
	}

	on_search_changed() {
		const text = this._search_entry.text.toLowerCase();
		this._entries_page.search_changed(text);
		this._stack.visible_child = this._entries_page.any_results ? this._navigation_view : this._no_results_status;
	}

	load_entries() {
		const root_map = new Map();
		const overridden_entries = [];

		const [__, root_errors] = get_entries_in(
			SharedVars.root_autostart_dir,
			entry => {
				root_map.set(entry.file_name, entry);
				return true;
			},
		);

		const [home_entries, home_errors] = get_entries_in(
			SharedVars.home_autostart_dir,
			entry => {
				if (!root_map.has(entry.file_name)) {
					return true;
				}
				overridden_entries.push(entry);
				root_map.delete(entry.file_name);
				return false;
			},
		);

		const root_entries = [...root_map.values()];

		this._entries_page.load_entries(root_entries, overridden_entries, home_entries);

		if (root_errors.length + home_errors.length > 0) {
			add_error_toast(
				_("Could not load some entries"),
				(root_errors.concat(home_errors)
					.map(entry => entry.file_name)
					.join('\n')
				),
			);
		}
	}
});
