import { Signal } from "../utils/signal.js"

import GObject from "gi://GObject?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

export class FirstRunPage extends Adw.NavigationPage {
	static {
		GObject.registerClass({
			GTypeName: "FirstRunPage",
			Template: "resource:///io/github/flattool/Ignition/first_run_page/first-run-page.ui",
			InternalChildren: ["get_started_button"],
		}, FirstRunPage)
	}

	declare _get_started_button: Gtk.Button
	readonly signals = {
		button_clicked: new Signal(),
	} as const

	constructor(params?: Adw.NavigationPage.ConstructorProps) {
		super(params)

		this._get_started_button.connect("clicked", () => this.signals.button_clicked.emit())
	}
}
