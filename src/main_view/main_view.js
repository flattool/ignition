const { GObject, Adw } = imports.gi;
import { EntriesPage } from "./entries_page.js";
import { ChoicesPage } from "./choices_page.js";

export const MainView = GObject.registerClass({
	GTypeName: 'MainView',
	Template: 'resource:///io/github/flattool/Ignition/main_view/main-view.ui',
	InternalChildren: [
		'navigation_view',
			'entries_page',
			'choices_page',
	],
}, class MainView extends Adw.Bin {
	constructor() {
		super(...arguments);
	}

	on_new_entry() {
		if (this._navigation_view.get_visible_page() !== this._choices_page) {
			this._navigation_view.push(this._choices_page);
		}
	}

	load_entries() {
		this._entries_page.load_entries();
	}
});
