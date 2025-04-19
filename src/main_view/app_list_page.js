const { GObject, Gio, Adw } = imports.gi;

export const AppListPage = GObject.registerClass({
	GTypeName: "AppListPage",
	Template: "resource:///io/github/flattool/Ignition/main_view/app-list-page.ui",
	InternalChildren: [],
}, class AppListPage extends Adw.NavigationPage {
	constructor() {
		super(...arguments);
	}
});
