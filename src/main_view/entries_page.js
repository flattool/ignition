const { GObject, Adw } = imports.gi;

export const EntriesPage = GObject.registerClass({
	GTypeName: 'EntriesPage',
	Template: 'resource:///io/github/flattool/Ignition/main_view/entries-page.ui',
	InternalChildren: [
		'home_group',
		'overrides_group',
		'root_group',
		'add_button',
	],
}, class EntriesPage extends Adw.NavigationPage {
	get any_results() {
		return (
			this._home_group.any_visible
			&& this._overrides_group.any_visible
			&& this._root_group.any_visible
		)
	}

	constructor() {
		super(...arguments);

		this._home_group._group.title = _("Your Startup Entries");
		this._home_group._group.description = _("Entries you have added.");
		this._home_group._group.header_suffix = this._add_button;

		this._overrides_group._group.title = _("Overridden Startup Entries");
		this._overrides_group._group.description = _("System entries that you have edited.");

		this._root_group._group.title = _("System Startup Entries");
		this._root_group._group.description = _("Entries created by the system.");
	}

	search_changed(value) {
		value = value.toLowerCase();
		this._home_group.search_changed(value);
		this._overrides_group.search_changed(value);
		this._root_group.search_changed(value);
	}

	load_entries(root, overrides, home) {
		this._home_group.load_entries(home);
		this._overrides_group.load_entries(overrides);
		this._root_group.load_entries(root);
	}
});
