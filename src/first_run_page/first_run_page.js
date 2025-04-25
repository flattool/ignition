import { Signal } from "../utils/signal.js";

const { GObject, Adw } = imports.gi;

export const FirstRunPage = GObject.registerClass({
	GTypeName: 'FirstRunPage',
	Template: 'resource:///io/github/flattool/Ignition/first_run_page/first-run-page.ui',
	InternalChildren: ['get_started_button'],
}, class FirstRunPage extends Adw.NavigationPage {
	signals = {
		button_clicked: new Signal(),
	};

	constructor() {
		super(...arguments);

		this._get_started_button.connect('clicked', () => this.signals.button_clicked.emit());
	}
});
