const { GObject, Adw } = imports.gi;
import { Signal } from "../utils/signal.js";

export const EntriesPage = GObject.registerClass({
	GTypeName: 'EntriesPage',
	Template: 'resource:///io/github/flattool/Ignition/main_view/entries-page.ui',
	InternalChildren: [
		'home_group',
		'root_group',
		'add_button',
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

	load_entries(root, home) {
		this._home_group.load_entries(home);
		this._root_group.load_entries(root);
	}
});
