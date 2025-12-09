import { FirstRunPage } from "../first_run_page/first_run_page.js"
import { MainView } from "../main_view/main_view.js"
import { Async } from "../utils/async.js"
import { Config } from "../config.js"
import { SharedVars } from "../utils/shared_vars.js"
import { add_error_toast } from "../utils/helper_funcs.js"

import GObject from "gi://GObject?version=2.0"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

export class IgnitionWindow extends Adw.ApplicationWindow {
	static {
		GObject.registerClass({
			GTypeName: "IgnitionWindow",
			Template: "resource:///io/github/flattool/Ignition/window/window.ui",
			InternalChildren: [
				"toast_overlay",
				"stack",
				"first_run_page",
				"main_view",
			],
		}, this)
	}

	declare readonly _toast_overlay: Adw.ToastOverlay
	declare readonly _stack: Gtk.Stack
	declare readonly _first_run_page: FirstRunPage
	declare readonly _main_view: MainView

	settings: Gio.Settings

	constructor(params?: Partial<Adw.ApplicationWindow.ConstructorProps>) {
		super(params)
		SharedVars.main_window = this

		if (Config.PROFILE === "development") {
			this.add_css_class("devel")
		}

		this.settings = Gio.Settings.new("io.github.flattool.Ignition")
		if (this.settings.get_boolean("first-run")) {
			this.on_first_run()
		} else {
			this.startup()
		}
	}

	on_first_run(): void {
		this._stack.transition_type = Gtk.StackTransitionType.SLIDE_LEFT
		this._first_run_page.signals.button_clicked.connect(() => {
			this.settings.set_boolean("first-run", false)
			this.startup()
		})
	}

	on_new_entry(): void {
		this._main_view.on_new_entry()
	}

	startup(): void {
		this._stack.visible_child = this._main_view

		try {
			if (!SharedVars.is_flatpak && !SharedVars.home_autostart_dir.query_exists(null)) {
				SharedVars.home_autostart_dir.make_directory_with_parents(null)
			}
			if (!SharedVars.home_autostart_dir.query_exists(null)) {
				throw new Error("Failed to initialize Autostart Directory")
			}
		} catch (error: unknown) {
			add_error_toast(_("Failed to start properly"), `${error}`)
			return
		}

		Async.run_pipe([
			...this._main_view.load_host_apps(),
			...this._main_view.load_entries(),
		])
	}
}
