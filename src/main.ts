// main.js
//
// Copyright 2024 Heliguy
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
// SPDX-License-Identifier: GPL-3.0-or-later
//

import GLib from "gi://GLib?version=2.0"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

import { GObjectify } from "./utils/gobjectify.js"
import { MainWindow } from "./window/main_window.js"
import { SharedVars } from "./utils/shared_vars.js"

Gio._promisify(Gtk.FileLauncher.prototype, "launch", "launch_finish")

@GObjectify.Class({ manual_gtype_name: "Gjs_Application" })
export class Application extends Adw.Application {
	private _main_window?: MainWindow
	private about_dialog: Adw.AboutDialog

	public constructor() {
		super({ application_id: "io.github.flattool.Ignition", flags: Gio.ApplicationFlags.DEFAULT_FLAGS })

		SharedVars.application = this

		const gtk_version = `${Gtk.MAJOR_VERSION}.${Gtk.MINOR_VERSION}.${Gtk.MICRO_VERSION}`
		const adw_version = `${Adw.MAJOR_VERSION}.${Adw.MINOR_VERSION}.${Adw.MICRO_VERSION}`
		const os_string = `${GLib.get_os_info("NAME")} ${GLib.get_os_info("VERSION")}`
		const lang = GLib.environ_getenv(GLib.get_environ(), "LANG")
		const troubleshooting = (
			`OS: ${os_string}\n`
			+ `Ignition version: ${pkg.version}\n`
			+ `GTK: ${gtk_version}\n`
			+ `libadwaita: ${adw_version}\n`
			+ `App ID: ${pkg.app_id}\n`
			+ `Profile: ${pkg.profile}\n`
			+ `Language: ${lang}`
		)

		this.about_dialog = Adw.AboutDialog.new_from_appdata("/io/github/flattool/Ignition/appdata", null)
		this.about_dialog.version = pkg.version
		this.about_dialog.debug_info = troubleshooting
		this.about_dialog.add_link(_("Translate"), "https://weblate.fyralabs.com/projects/flattool/ignition/")
		this.about_dialog.add_link(_("Donate"), "https://ko-fi.com/heliguy")
		this.about_dialog.add_other_app("io.github.flattool.Warehouse", "Warehouse", "Manage all things Flatpak")
	}

	@GObjectify.SimpleAction({ accels: ["<primary>q"] })
	public override quit(): void { super.quit() }

	@GObjectify.SimpleAction()
	protected about(): void {
		this.about_dialog.present(this.active_window)
	}

	@GObjectify.SimpleAction({ accels: ["<primary><shift>o"] })
	protected async open_folder(): Promise<void> {
		const on_error = (title: string, error: unknown): void => this._main_window?.add_error_toast(title, error)
		try {
			const launcher = new Gtk.FileLauncher({ file: SharedVars.home_autostart_dir })
			const launched = await launcher.launch(this.active_window, null)
			if (launched) {
				this._main_window?.add_toast(_("Opened folder"))
			} else {
				on_error(_("Could not open folder"), "")
			}
		} catch (e) {
			on_error(_("Could not open folder"), e)
		}
	}

	@GObjectify.SimpleAction({ accels: ["<primary>n"] })
	protected new_entry(): void {}

	@GObjectify.SimpleAction({ accels: ["<primary>s"] })
	protected save_edits(): void {}

	@GObjectify.SimpleAction({ accels: ["<primary>f"] })
	protected search(): void {}

	public override vfunc_activate(): void {
		(this._main_window ??= new MainWindow({ application: this })).present()
		SharedVars.main_window = this._main_window
	}
}

export function main(argv: string[]): Promise<number> {
	const application = new Application()
	return application.runAsync(argv)
}
