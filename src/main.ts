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

import "./first_run_page/first_run_page.js"
import "./gtk/entry_group.js"
import "./gtk/entry_row.js"
import "./gtk/help_dialog.js"
import "./main_view/app_list_page.js"
import "./main_view/details_page.js"
import "./main_view/entries_page.js"
import "./main_view/main_view.js"

import { IgnitionWindow } from "./window/window.js"
import { SharedVars } from "./utils/shared_vars.js"
import { add_error_toast, add_toast } from "./utils/helper_funcs.js"

import GObject from "gi://GObject?version=2.0"
import GLib from "gi://GLib?version=2.0"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"

class IgnitionApplication extends Adw.Application {
	static {
		GObject.registerClass(IgnitionApplication)
	}

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

		const show_about_action = new Gio.SimpleAction({ name: "about" })
		show_about_action.connect("activate", (_action) => {
			const aboutDialog = Adw.AboutDialog.new_from_appdata("/io/github/flattool/Ignition/appdata", null)
			aboutDialog.version = pkg.version
			aboutDialog.debug_info = troubleshooting
			aboutDialog.add_link(_("Translate"), "https://weblate.fyralabs.com/projects/flattool/ignition/")
			aboutDialog.add_link(_("Donate"), "https://ko-fi.com/heliguy")
			aboutDialog.add_other_app("io.github.flattool.Warehouse", "Warehouse", "Manage all things Flatpak")
			aboutDialog.present(this.active_window)
		})
		this.add_action(show_about_action)

		const quit_action = new Gio.SimpleAction({ name: "quit" })
		quit_action.connect("activate", (_action) => {
			this.quit()
		})
		this.add_action(quit_action)
		this.set_accels_for_action("app.quit", ["<primary>q"])

		const new_entry_action = new Gio.SimpleAction({ name: "new-entry" })
		this.add_action(new_entry_action)
		this.set_accels_for_action("app.new-entry", ["<primary>n"])

		const open_folder_action = new Gio.SimpleAction({ name: "open-folder" })
		open_folder_action.connect("activate", (_action) => {
			const launcher = new Gtk.FileLauncher({ file: SharedVars.home_autostart_dir })
			launcher.launch(this.active_window, null, (_lnch, result) => {
				try {
					launcher.launch_finish(result)
					add_toast(_("Opened folder"))
				} catch (error) {
					add_error_toast(
						_("Could not open folder"),
						`Path: ${SharedVars.home_autostart_dir.get_path()}\n${error}`,
					)
				}
			})
		})
		this.add_action(open_folder_action)
		this.set_accels_for_action("app.open-folder", ["<primary><shift>o"])

		const save_action = new Gio.SimpleAction({ name: "save-edits" })
		this.add_action(save_action)
		this.set_accels_for_action("app.save-edits", ["<primary>s"])

		const search_action = new Gio.SimpleAction({ name: "search" })
		this.add_action(search_action)
		this.set_accels_for_action("app.search", ["<primary>f"])
	}

	public override vfunc_activate(): void {
		let { active_window } = this

		if (!active_window) active_window = new IgnitionWindow({ application: this })

		active_window.present()
	}
}

export function main(argv: string[]): Promise<number> {
	const application = new IgnitionApplication()
	return application.runAsync(argv)
}
