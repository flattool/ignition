const { GObject, Gio, Adw } = imports.gi;
import { Signal } from "../utils/signal.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Async } from "../utils/async.js";
import { AutostartEntry } from "../utils/autostart_entry.js";
import { entry_iteration, add_error_toast } from "../utils/helper_funcs.js";

export const EntriesPage = GObject.registerClass({
	GTypeName: 'EntriesPage',
	Template: 'resource:///io/github/flattool/Ignition/main_view/entries-page.ui',
	InternalChildren: [
		'home_group',
			'add_button',
		'root_group',
	],
}, class EntriesPage extends Adw.NavigationPage {
	#loaded_groups = [];

	signals = {
		finished_loading: new Signal(),
	}

	get any_results() {
		return (
			this._home_group.any_results
			|| this._root_group.any_results
		);
	}

	constructor() {
		super(...arguments);

		this._home_group._group.title = _("User Startup Entries");
		this._home_group._group.description = _("Entries that run only for you.");
		this._home_group._group.header_suffix = this._add_button;

		this._root_group._group.title = _("System Startup Entries");
		this._root_group._group.description = _("Entries that run for everyone.");

		this._home_group.signals.finished_loading.connect(group => this.#on_group_finished_loading(group));
		this._root_group.signals.finished_loading.connect(group => this.#on_group_finished_loading(group));
	}

	#on_group_finished_loading(group) {
		this.#loaded_groups.push(group);
		if (
			this.#loaded_groups.includes(this._root_group)
			&& this.#loaded_groups.includes(this._home_group)
		) {
			this.signals.finished_loading.emit(this);
		}
	}

	search_changed(value) {
		this._home_group.search_changed(value);
		this._root_group.search_changed(value);
	}

	load_entries() {
		const root_map = new Map(); // File name -> entry object
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
		Async.run_pipe(
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
					(err, path) => fails.push(`${err}:\n${path}`),
				),
			],
			() => {
				// When done
				if (fails.length > 0) {
					add_error_toast(
						SharedVars.main_window,
						_("Could not load some entries"),
						fails.join("\n\n"),
					);
				}
				this._root_group.load_entries([...root_map.values()]);
				this._home_group.load_entries(home_entries);
			}
		);
	}
});
