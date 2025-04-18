const { GObject, Gio, Adw } = imports.gi;
import { add_error_toast, entry_iteration, get_entries_in, run_async, run_async_pipe } from "../utils/helper_funcs.js";
import { SharedVars } from "../utils/shared_vars.js";
import { EntriesPage } from "./entries_page.js";
import { EntryGroup } from "../gtk/entry_group.js";
import { AutostartEntry } from "../utils/autostart_entry.js";

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

		this._stack.visible_child = this._navigation_view;
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
		const root_map = new Map();
		const home_entries = [];
		const fails = [];
		const root_enumerator = SharedVars.root_autostart_dir.enumerate_children(
			'standard::*',
			Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
			null,
		);
		const home_enumerator = SharedVars.home_autostart_dir.enumerate_children(
			'standard::*',
			Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
			null,
		);
		run_async_pipe(
			[
				() => entry_iteration(
					SharedVars.root_autostart_dir,
					root_enumerator,
					entry => root_map.set(entry.file_name, entry),
					path => fails.push(path),
				),
				() => entry_iteration(
					SharedVars.home_autostart_dir,
					home_enumerator,
					entry => {
						if (root_map.has(entry.file_name)) {
							root_map.get(entry.file_name).overridden = AutostartEntry.Overrides.OVERRIDDEN;
							entry.overridden = AutostartEntry.Overrides.OVERIDES;
						}
						home_entries.push(entry);
					},
					path => fails.push(path),
				),
			],
			() => {
				// When done
				if (fails.length > 0) {
					add_error_toast(
						SharedVars.main_window,
						_("Could not load some entries"),
						fails.join('\n'),
					);
				}
				// print("Root:\n" + [...root_map.keys()].map(e => '- ' + e).join('\n'));
				// print("Home:\n" + home_entries.map(e => '- ' + e.file_name).join('\n'));
				this._entries_page.load_entries([...root_map.values()], home_entries);
			}
		)
	}
});
