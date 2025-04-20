import { EntryRow } from "../gtk/entry_row.js";
import { Async } from "../utils/async.js";
import { KeyFileHelper } from "../utils/key_file_helper.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Signal } from "../utils/signal.js";
import { add_error_toast, host_app_iteration } from "../utils/helper_funcs.js";

const { GObject, Adw } = imports.gi;

export const AppListPage = GObject.registerClass({
	GTypeName: "AppListPage",
	Template: "resource:///io/github/flattool/Ignition/main_view/app-list-page.ui",
	InternalChildren: [
		'search_bar',
			'search_entry',
		'stack',
			'scrolled_window',
				'apps_group',
					'show_hidden_switch',
				'list_box',
			'no_results_status',
	],
}, class AppListPage extends Adw.NavigationPage {
	signals = {
		app_chosen: new Signal(),
	};

	constructor() {
		super(...arguments);

		this._list_box.set_sort_func((row1, row2) => (
			row1.sort_last === row2.sort_last
			? row1.title.toLowerCase() > row2.title.toLowerCase()
			: row1.sort_last
		));

		this._search_entry.connect('search-changed', () => this.on_search_changed());
		this._show_hidden_switch.connect('notify::active', () => this.on_search_changed());
	}

	is_entry_hidden(entry) {
		return (
			KeyFileHelper.get_boolean_safe(entry.keyfile, "Desktop Entry", "Hidden", false)
			|| KeyFileHelper.get_boolean_safe(entry.keyfile, "Desktop Entry", "NoDisplay", false)
		);
	}

	on_search_changed() {
		const text = this._search_entry.text.toLowerCase();
		let any_visible = false;
		for (const row of this._list_box) {
			if (this.is_entry_hidden(row.entry) && !this._show_hidden_switch.active) {
				row.visible = false;
				continue;
			}
			if (
				row.title.toLowerCase().includes(text)
				|| row.subtitle.toLowerCase().includes(text)
			) {
				row.visible = true;
				any_visible = true;
			} else {
				row.visible = false;
			}
		}
		this._stack.visible_child = any_visible ? this._scrolled_window : this._no_results_status;
	}

	load_app_iterations_builder() {
		const fails = [];
		const tasks = (SharedVars.host_app_entry_dirs
			.filter(file => file.query_exists(null))
			.map(dir => host_app_iteration(
				dir,
				(entry) => {
					const row = new EntryRow(entry, false);
					row.connect('activated', () => this.signals.app_chosen.emit(entry));
					if (!this._show_hidden_switch.active && this.is_entry_hidden(entry)) {
						row.visible = false;
					}
					this._list_box.append(row);
				},
				(err, path) => fails.push(`${err}:\n${path}`),
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
});
