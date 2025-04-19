const { GObject, Adw } = imports.gi;
import { EntriesPage } from "./entries_page.js";
import { ChoicesPage } from "./choices_page.js";
import { AppListPage } from "./app_list_page.js";
import { DetailsPage } from "./details_page.js";

export const MainView = GObject.registerClass({
	GTypeName: 'MainView',
	Template: 'resource:///io/github/flattool/Ignition/main_view/main-view.ui',
	InternalChildren: [
		'navigation_view',
			'entries_page',
			'choices_page',
			'app_list_page',
			'details_page',
	],
}, class MainView extends Adw.Bin {
	constructor() {
		super(...arguments);

		this._choices_page.signals.app_clicked.connect(() => this.#push_page(this._app_list_page));
		this._choices_page.signals.script_clicked.connect(() => print("script"));
		this._entries_page.signals.row_clicked.connect((row, is_root) => {
			this._details_page.load_details(
				row.entry,
				is_root ? DetailsPage.Origins.ROOT : DetailsPage.Origins.HOME,
			);
			this.#push_page(this._details_page);
		});
		this._app_list_page.signals.app_chosen.connect(entry => {
			this._details_page.load_details(entry, DetailsPage.Origins.HOST_APP);
			this.#push_page(this._details_page);
		});
	}

	#push_page(push_page) {
		const nav_stack = this._navigation_view.get_navigation_stack();

		for (let i = 0, page; (page = nav_stack.get_item(i)) !== null; i += 1) {
			if (page === push_page) {
				return;
			}
		}

		this._navigation_view.push(push_page);
	}

	on_new_entry() {
		this.#push_page(this._choices_page);
	}

	load_host_apps() {
		return this._app_list_page.load_app_iterations_builder();
	}

	load_entries() {
		return this._entries_page.load_entries();
	}
});
