import Gio from "gi://Gio?version=2.0"
import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import Pango from "gi://Pango?version=1.0"
import GLib from "gi://GLib?version=2.0"
import Gdk from "gi://Gdk?version=4.0"

import { GObjectify } from "../utils/gobjectify.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/window/main_window" })
export class MainWindow extends Adw.ApplicationWindow {
	@GObjectify.Child
	public accessor toast_overlay!: Adw.ToastOverlay

	protected readonly settings = new Gio.Settings({ schema_id: pkg.app_id })

	public constructor(params?: Partial<Adw.ApplicationWindow.ConstructorProps>) {
		super(params)

		if (pkg.profile === "development") this.add_css_class("devel")
		print(`Welcome to ${pkg.app_id}!`)
	}

	public add_toast(title: string, action?: { button_label: string, callback: ()=> void }): void {
		let toast: Adw.Toast
		if (action) {
			toast = new Adw.Toast({ title, button_label: action.button_label })
			toast.connect("button-clicked", action.callback)
		} else {
			toast = new Adw.Toast({ title })
		}
		this.toast_overlay.add_toast(toast)
	}

	public add_error_toast(title: string, error: unknown): void {
		print(`[Error Toast]: ${title}`, error)

		const message_text = error instanceof Error ? error.message : `${error}`

		const label = new Gtk.Label({ selectable: true, wrap: true, wrap_mode: Pango.WrapMode.WORD_CHAR })
		label.set_markup(`<tt>${GLib.markup_escape_text(message_text, -1)}</tt>`)

		const dialog = new Adw.AlertDialog({ heading: title, extra_child: label })
		dialog.add_response("copy", _("Copy"))
		dialog.add_response("ok", _("OK"))
		dialog.connect("response", (__, response) => {
			if (response !== "copy") return
			Gdk.Display.get_default()?.get_clipboard().set(message_text)
		})

		this.add_toast(title, { button_label: _("Details"), callback: () => dialog.present(this) })
	}
}
