import { AppListPage } from "./app_list_page.js";
import { DetailsPage } from "./details_page.js";
import { EntriesPage } from "./entries_page.js";
import { AutostartEntry } from "../utils/autostart_entry.js";
import { SharedVars } from "../utils/shared_vars.js";
import { AsyncResult } from "../utils/async.js";

import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";

export class MainView extends Adw.Bin {
	static {
		GObject.registerClass({
			GTypeName: 'MainView',
			Template: 'resource:///io/github/flattool/Ignition/main_view/main-view.ui',
			InternalChildren: [
				'navigation_view',
				'entries_page',
				'app_list_page',
				'details_page',
			],
		}, this);
	}

	private _navigation_view!: Adw.NavigationView;
	private _entries_page!: EntriesPage;
	private _app_list_page!: AppListPage;
	private _details_page!: DetailsPage;

	constructor(params?: Adw.Bin.ConstructorProps) {
		super(params);

		this._entries_page.signals.row_clicked.connect((row, is_root) => {
			this._details_page.load_details(
				row.entry,
				is_root ? DetailsPage.Origins.ROOT : DetailsPage.Origins.HOME,
			);
			this.#push_page(this._details_page);
		});
		this._app_list_page.signals.script_chosen.connect(() => {
			this._details_page.load_details(new AutostartEntry(""), DetailsPage.Origins.NEW);
			this.#push_page(this._details_page);
		});
		this._app_list_page.signals.app_chosen.connect(entry => {
			this._details_page.load_details(entry, DetailsPage.Origins.HOST_APP);
			this.#push_page(this._details_page);
		});
		this._details_page.signals.pop_request.connect(() => this._navigation_view.pop_to_page(this._entries_page));

		const search_action = SharedVars.application?.lookup_action('search');
		if (search_action) search_action.connect('activate', () => {
			const current_page = this._navigation_view.get_visible_page() as AppListPage | DetailsPage | EntriesPage;
			if (
				(current_page === this._entries_page || current_page === this._app_list_page)
				&& current_page._search_button.sensitive
			) {
				current_page._search_bar.search_mode_enabled = true;
				current_page._search_entry.grab_focus();
			}
		});

		const new_action = SharedVars.application?.lookup_action('new-entry');
		if (new_action) new_action.connect('activate', () => this.on_new_entry());
	}

	#push_page(push_page: Adw.NavigationPage): void {
		const nav_stack = this._navigation_view.get_navigation_stack();

		for (let i = 0, page; (page = nav_stack.get_item(i)) !== null; i += 1) {
			if (page === push_page) {
				return;
			}
		}

		this._navigation_view.push(push_page);
	}

	on_new_entry(): void {
		this._app_list_page.scroll_to_top();
		this.#push_page(this._app_list_page);
	}

	load_host_apps(): (() => AsyncResult)[] {
		return this._app_list_page.load_app_iterations_builder();
	}

	load_entries(): (() => AsyncResult)[] {
		return this._entries_page.load_entries();
	}
}
