import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import { AppChooserPage } from './app_chooser_page.js';
import { DetailsPage } from './details_page.js';
import { new_error_toast } from './error_toast.js';
import { IconUtils, SharedVars, Signal } from './utils.js';

export const PropertiesDialog = GObject.registerClass({
	GTypeName: 'PropertiesDialog',
	Template: 'resource:///io/github/flattool/Ignition/gtk/properties-dialog.ui',
	InternalChildren: [
		"toast_overlay",
			"navigation_view",
				"choice_page",
					"new_app_button",
					"new_script_button",
				"details_page",
				"app_chooser_page",
	],
}, class PropertiesDialog extends Adw.Dialog {
	show_details(auto_entry, is_new_file) {
		try {
			this._details_page.load_details(auto_entry, is_new_file);
			if (this._navigation_view.get_visible_page() !== this._details_page) {
				this._navigation_view.push(this._details_page);
			}
		} catch(error) {
			this._toast_overlay.add_toast(
				new_error_toast(this, _("Error loading details"), error)
			)
		}
	}

	present(auto_entry, ...args) {
		if (this.is_showing) return;
		if (auto_entry) {
			this.follows_content_size = true;
			this._navigation_view.animate_transitions = false;
			this.show_details(auto_entry, false);
			this._navigation_view.animate_transitions = true;
		} else {
			this.follows_content_size = false;
			this._navigation_view.animate_transitions = false;
			this._navigation_view.pop_to_page(this._choice_page);
			this._navigation_view.animate_transitions = true;
		}
		super.present(...args);
		this.grab_focus();
		this.is_showing = true;
	}

	save_action() {
		if (this._navigation_view.get_visible_page() !== this._details_page || !this.is_showing) {
			return;
		}
		this._details_page.on_apply();
	}

	trash_action() {
		if (this._navigation_view.get_visible_page() !== this._details_page || !this.is_showing) {
			return;
		}
		this._details_page.on_trash();
	}

	on_error(title, error) {
		print(title, error)
		this._toast_overlay.add_toast(new_error_toast(this, title, error));
	}

	get_host_apps(callback) {
		const on_finish = (total_rows, failed_entries) => {
			if (total_rows === 0) {
				this._new_app_button.sensitive = false;
				this._new_app_button.tooltip_text = _("No installed apps found");
			}
			if (failed_entries.length > 0) {
				this.signals.failed_loading_some_apps.emit(failed_entries);
			}
			callback();
		}
		this._app_chooser_page.get_host_apps(on_finish);
	}

	is_showing = false;
	signals = {
		failed_loading_some_apps: new Signal(),
	}

	constructor(...args) {
		super(...args);

		this._new_app_button.connect(`clicked`, () => this._navigation_view.push(this._app_chooser_page));
		this._new_script_button.connect(`clicked`, this.show_details.bind(this, null, true));
		this._app_chooser_page.signals.app_chosen.connect((auto_entry) => this.show_details(auto_entry, true));
		this._details_page.signals.cancel_pressed.connect(() => this.close());
		this._details_page.signals.save_failed.connect((err) => this.on_error(_("Could not save file"), err));
		this._details_page.signals.trash_failed.connect((err) => this.on_error(_("Could not trash file"), err));
		this.connect("closed", () => this.is_showing = false);
	}
});
