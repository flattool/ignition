const { GObject, Gio, Gtk, Adw } = imports.gi;
import { Config } from '../config.js';
import { FirstRunPage } from '../first_run_page/first_run_page.js';
import { MainView } from '../main_view/main_view.js';
import { AutostartEntry } from '../utils/autostart_entry.js';
import { Async } from '../utils/async.js';
import { SharedVars } from '../utils/shared_vars.js';

export const IgnitionWindow = GObject.registerClass({
	GTypeName: 'IgnitionWindow',
	Template: 'resource:///io/github/flattool/Ignition/window/window.ui',
	InternalChildren: [
		'toast_overlay',
			'stack',
				'first_run_page',
				'main_view',
	],
}, class IgnitionWindow extends Adw.ApplicationWindow {
	settings;

	constructor(application) {
		super({ application });

		if (Config.PROFILE === "development") {
			this.add_css_class("devel");
		}

		this.settings = Gio.Settings.new("io.github.flattool.Ignition");
		if (this.settings.get_boolean("first-run")) {
			this.on_first_run();
		} else {
			this.startup();
		}
	}

	on_first_run() {
		this._stack.transition_type = Gtk.StackTransitionType.SLIDE_LEFT;
		this._first_run_page.signals.button_clicked.connect(() => {
			this.settings.set_boolean("first-run", false);
			this.startup();
		});
	}

	on_new_entry() {
		this._main_view.on_new_entry();
	}

	startup() {
		this._stack.visible_child = this._main_view;

		Async.run_pipe([
			...this._main_view.load_host_apps(),
			...this._main_view.load_entries()
		]);
	}
});
