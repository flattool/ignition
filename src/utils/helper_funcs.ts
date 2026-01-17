import GLib from "gi://GLib?version=2.0"
import Gdk from "gi://Gdk?version=4.0"
import Gtk from "gi://Gtk?version=4.0"
import Adw from "gi://Adw?version=1"
import Pango from "gi://Pango?version=1.0"
import Gio from "gi://Gio?version=2.0"
import type GObject from "gi://GObject?version=2.0"

import { SharedVars } from "./shared_vars.js"
import { next_idle } from "../gobjectify/gobjectify.js"

const HOST_PATHS_NEEDING_PREFIX = new Set<string>(["etc", "usr", "bin", "sbin", "lib"])

export const path_with_prefix = (path: string): string => {
	if (!SharedVars.is_flatpak || !path.startsWith("/")) return path
	const split_path = path.split("/")
	if (HOST_PATHS_NEEDING_PREFIX.has(split_path[1]!)) {
		split_path[1] = "run/host/" + split_path[1]
		return split_path.join("/")
	}
	return path
}

export const add_toast = (title: string, window = SharedVars.main_window): void => {
	window?._toast_overlay.add_toast(Adw.Toast.new(title))
}

export const add_error_toast = (title: string, message: string, window = SharedVars.main_window): void => {
	const label = new Gtk.Label({
		selectable: true,
		wrap: true,
		wrap_mode: Pango.WrapMode.WORD_CHAR,
	})
	label.set_markup(`<tt>${GLib.markup_escape_text(message, -1)}</tt>`)
	const error_dialog = new Adw.AlertDialog({
		heading: title,
		extra_child: label,
	})
	error_dialog.add_response("copy", _("Copy"))
	error_dialog.add_response("ok", _("OK"))
	error_dialog.connect("response", (__, response) => {
		if (response !== "copy") {
			return
		}
		Gdk.Display.get_default()?.get_clipboard().set(message)
	})
	const toast = new Adw.Toast({
		title,
		button_label: _("Details"),
	})
	toast.connect("button-clicked", () => error_dialog.present(window))
	window?._toast_overlay.add_toast(toast)
	print("==== Error Toast ====")
	print(title)
	print(message)
	print("=====================")
}

type IterableModel<T> = Iterable<T> & { forEach(callback: (item: T, index: number) => void): void }

export const iterate_model = <T extends GObject.Object>(model: Gio.ListModel<T>): IterableModel<T> => {
	const length: number = model.get_n_items()
	return {
		*[Symbol.iterator](): IterableIterator<T> {
			for (let i = 0; i < length; i += 1) yield model.get_item(i)!
		},

		forEach(callback: (item: T, index: number) => void): void {
			for (let i = 0; i < length; i += 1) callback(model.get_item(i)!, i)
		},
	}
}

export const idle_run = async <T>(to_run: () => T): Promise<T> => {
	await next_idle()
	return to_run()
}
