const { GObject, Gio, Adw } = imports.gi;

export const ChoicesPage = GObject.registerClass({
	GTypeName: "ChoicesPage",
	Template: "resource:///io/github/flattool/Ignition/main_view/choices-page.ui",
	InternalChildren: [
		"new_app_button",
		"new_script_button",
	],
}, class ChoicesPage extends Adw.NavigationPage {
	constructor() {
		super(...arguments);
	}
});
