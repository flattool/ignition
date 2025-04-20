import { Signal } from "../utils/signal.js";

const { GObject, Adw } = imports.gi;

export const ChoicesPage = GObject.registerClass({
	GTypeName: "ChoicesPage",
	Template: "resource:///io/github/flattool/Ignition/main_view/choices-page.ui",
	InternalChildren: [
		"new_app_button",
		"new_script_button",
	],
}, class ChoicesPage extends Adw.NavigationPage {
	signals = {
		app_clicked: new Signal(),
		script_clicked: new Signal(),
	};

	constructor() {
		super(...arguments);

		this._new_app_button.connect('clicked', () => this.signals.app_clicked.emit());
		this._new_script_button.connect('clicked', () => this.signals.script_clicked.emit());
	}
});
