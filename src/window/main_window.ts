import Adw from "gi://Adw"
// import Gio from "gi://Gio?version=2.0"

import { GClass } from "../gobjectify/gobjectify.js"

import "../pages/entries_page.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/window/main_window.ui" })
export class MainWindow extends Adw.ApplicationWindow {
	// readonly #settings = new Gio.Settings({ schema: pkg.app_id })
	readonly _toast_overlay = new Adw.ToastOverlay()

	_ready(): void {
		if (pkg.profile === "development") this.add_css_class("devel")
		print(`Welcome to ${pkg.app_id}`)
	}
}
