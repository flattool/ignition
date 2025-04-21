import { SharedVars } from "../utils/shared_vars.js";

const { GObject, GLib, Adw } = imports.gi;

export const HelpDialog = GObject.registerClass({
	GTypeName: 'HelpDialog',
	Template: 'resource:///io/github/flattool/Ignition/gtk/help-dialog.ui',
	InternalChildren: [
		'header_bar',
		'find_app_row',
		'system_entry_row',
		'delay_row',
		'navigation_view',
		'base_page',
		'status_page',
		'find_app_row',
		'system_entry_row',
		'delay_row',
		'find_app_page',
		'system_entry_page',
		'delay_page',
	],
}, class HelpDialog extends Adw.Dialog {
	constructor() {
		super(...arguments);

		this._find_app_row.connect('activated', () => this._navigation_view.push(this._find_app_page));
		this._system_entry_row.connect('activated', () => this._navigation_view.push(this._system_entry_page));
		this._delay_row.connect('activated', () => this._navigation_view.push(this._delay_page));

		this._find_app_row.visible = SharedVars.is_flatpak;

		const scrolled_window = this._status_page.get_first_child()
		scrolled_window.get_vadjustment().connect(
			'value-changed',
			(adj) => this._header_bar.show_title = adj.value > 0,
		);
	}

	on_scroll() {

	}
});
