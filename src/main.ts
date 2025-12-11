import GLib from "gi://GLib?version=2.0"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

import { MainWindow } from "./main_window/main_window.js"
import { SharedVars } from "./utils/shared_vars.js"
import { dedent, from, GClass, OnSimpleAction, SimpleAction } from "./gobjectify/gobjectify.js"

Gio._promisify(Gtk.FileLauncher.prototype, "launch", "launch_finish")

@GClass()
export class IgnitionApplication extends from(Adw.Application, {
	_quit: SimpleAction({ accels: ["<primary>q"] }),
	about: SimpleAction(),
	new_entry: SimpleAction({ accels: ["<primary>n"] }),
	open_folder: SimpleAction({ accels: ["<primary><shift>o"] }),
	save_edits: SimpleAction({ accels: ["<primary>s"] }),
	search: SimpleAction({ accels: ["<primary>f"] }),
}) {
	#main_window?: MainWindow

	override vfunc_activate(): void {
		SharedVars.main_window ??= new MainWindow({ application: this })
		; (this.#main_window ??= SharedVars.main_window).present()
	}

	_ready(): void {
		this._quit.connect("activate", () => this.quit())
	}

	@OnSimpleAction("about")
	#about(): void {
		const gtk_version = `${Gtk.MAJOR_VERSION}.${Gtk.MINOR_VERSION}.${Gtk.MICRO_VERSION}`
		const adw_version = `${Adw.MAJOR_VERSION}.${Adw.MINOR_VERSION}.${Adw.MICRO_VERSION}`
		const os_string = `${GLib.get_os_info("NAME")} ${GLib.get_os_info("VERSION")}`
		const lang: string | null = GLib.environ_getenv(GLib.get_environ(), "LANG")
		const troubleshooting: string = dedent`
			OS: ${os_string}
			an-app version: ${pkg.version}
			GTK: ${gtk_version}
			libadwaita: ${adw_version}
			App ID: ${pkg.app_id}
			Profile: ${pkg.profile}
			Language: ${lang}
		`

		const dialog = Adw.AboutDialog.new_from_appdata("/io/github/flattool/Ignition/appdata", null)
		dialog.version = pkg.version
		dialog.debug_info = troubleshooting
		dialog.add_link(_("Donate"), "https://ko-fi.com/heliguy")
		dialog.add_other_app("io.github.flattool.Warehouse", "Warehouse", "Manage all things Flatpak")
		dialog.present(this.active_window)
	}

	@OnSimpleAction("open_folder")
	async #open_folder(): Promise<void> {
		const launcher = new Gtk.FileLauncher({ file: SharedVars.home_autostart_dir })
		try {
			const result: boolean = await launcher.launch(this.active_window, null)
			if (!result) {
				print("Folder launch returned false :(")
			}
		} catch (e) {
			print(`Could not launch folder: ${e}`)
		}
	}
}

export function main(argv: string[]): Promise<number> {
	const application = new IgnitionApplication({
		application_id: pkg.app_id,
		flags: Gio.ApplicationFlags.DEFAULT_FLAGS,
	})
	return application.runAsync(argv)
}
