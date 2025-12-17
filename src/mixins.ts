import GLib from "gi://GLib?version=2.0"
import Adw from "gi://Adw?version=1"
import type Gtk from "gi://Gtk?version=4.0"

declare global {
	interface String {
		markup_escape_text(this: string): string
	}
}

String.prototype.markup_escape_text = function (): string {
	return GLib.markup_escape_text(this, -1)
}

declare module "gi://GLib?version=2.0" {
	export namespace GLib {
		export interface KeyFile {
			get_string_safe(group_name: string, key: string, fallback?: string): string
			get_locale_string_safe(group_name: string, key: string, locale: string | null, fallback?: string): string
			get_boolean_safe(group_name: string, key: string, fallback?: boolean): boolean
			get_int64_safe(group_name: string, key: string, fallback?: number): number
		}
	}
}

GLib.KeyFile.prototype.get_string_safe = function (group_name, key, fallback = ""): string {
	try {
		return this.get_string(group_name, key) || fallback
	} catch {
		return fallback
	}
}

GLib.KeyFile.prototype.get_locale_string_safe = function (
	group_name,
	key,
	locale: string | null,
	fallback = "",
): string {
	try {
		return this.get_locale_string(group_name, key, locale) || fallback
	} catch {
		return fallback
	}
}

GLib.KeyFile.prototype.get_boolean_safe = function (group_name, key, fallback = false): boolean {
	try {
		return this.get_boolean(group_name, key)
	} catch {
		return fallback
	}
}

GLib.KeyFile.prototype.get_int64_safe = function (group_name: string, key: string, fallback = 0.0): number {
	try {
		return this.get_int64(group_name, key)
	} catch {
		return fallback
	}
}

declare module "gi://Adw?version=1" {
	export namespace Adw {
		export interface PreferencesGroup {
			remove_all(): void
		}
	}
}

Adw.PreferencesGroup.prototype.remove_all = function (): void {
	for (let i = 0; ; i += 1) {
		const row: Gtk.Widget | null = this.get_row(i)
		if (row === null) return
		this.remove(row)
	}
}
