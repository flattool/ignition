import GLib from "gi://GLib?version=2.0"
import Gio from "gi://Gio?version=2.0"
import GObject from "gi://GObject?version=2.0"

import { from, GClass, Property } from "../gobjectify/gobjectify.js"
import { SharedVars } from "./shared_vars.js"
import { DelayHelper } from "./delay_helper.js"
// import { path_with_prefix } from "./helper_funcs.js"

export const GROUP_NAME: string = "Desktop Entry"

Gio._promisify(Gio.File.prototype, "trash_async", "trash_finish")

export namespace AutostartEntry {
	export type OverrideState = "NONE" | "OVERRIDES" | "OVERRIDDEN"
}

@GClass()
export class AutostartEntry extends from(GObject.Object, {
	enabled: Property.bool(),
	name: Property.string(),
	comment: Property.string(),
	exec: Property.string(),
	terminal: Property.bool(),
	icon: Property.string(),
	delay: Property.double(),
	path: Property.string({ flags: "CONSTRUCT_ONLY" }),
}) {
	static verify_file(path: string): "is_dir" | "not_exist" | "symlink" | "not_desktop_entry" | "" {
		if (!path.endsWith(".desktop")) return "not_desktop_entry"
		const file = Gio.File.new_for_path(path)
		if (!file.query_exists(null)) return "not_exist"
		const kind: Gio.FileType = file.query_file_type(Gio.FileQueryInfoFlags.NONE, null)
		if (kind === Gio.FileType.DIRECTORY) return "is_dir"
		if (kind === Gio.FileType.SYMBOLIC_LINK) return "symlink"
		return ""
	}

	override get enabled(): boolean {
		return !this.#keyfile.get_boolean_safe(GROUP_NAME, "Hidden", false)
	}
	override set enabled(v: boolean) {
		this.#keyfile.set_boolean(GROUP_NAME, "Hidden", !v)
	}

	override get name(): string {
		return this.#keyfile.get_locale_string_safe(GROUP_NAME, "Name", null, SharedVars.default_name)
	}
	override set name(v: string) {
		this.#keyfile.set_string(GROUP_NAME, "Name", v)
		if (this.#locale) {
			this.#keyfile.set_locale_string(GROUP_NAME, "Name", this.#locale, v)
		}
	}

	override get comment(): string {
		return this.#keyfile.get_string_safe(GROUP_NAME, "Comment", SharedVars.default_comment)
	}
	override set comment(v: string) {
		this.#keyfile.set_string(GROUP_NAME, "Comment", v)
		if (this.#locale) {
			this.#keyfile.set_locale_string(GROUP_NAME, "Comment", this.#locale, v)
		}
	}

	override get exec(): string { return this.#keyfile.get_string_safe(GROUP_NAME, "Exec") }
	override set exec(v: string) { this.#keyfile.set_string(GROUP_NAME, "Exec", v) }

	override get terminal(): boolean { return this.#keyfile.get_boolean_safe(GROUP_NAME, "Terminal") }
	override set terminal(v: boolean) { this.#keyfile.set_boolean(GROUP_NAME, "Terminal", v) }

	override get icon(): string { return this.#keyfile.get_string_safe(GROUP_NAME, "Icon") }
	override set icon(v: string) { this.#keyfile.set_string(GROUP_NAME, "Icon", v) }

	override get delay(): number {
		if (this.#delay_cache !== null) return this.#delay_cache
		const raw_exec = this.exec
		if (raw_exec.endsWith(".ignition_delay.sh")) {
			const [delay, , error] = DelayHelper.load_delay(Gio.File.new_for_path(raw_exec))
			if (!error) {
				this.#delay_cache = delay
				return delay
			}
		}
		return 0
	}
	override set delay(v: number) {
		this.#delay_cache = v
		print("setting delay not implemented yet")
	}

	readonly #file = Gio.File.new_for_path(this.path)
	readonly #keyfile = new GLib.KeyFile()
	#delay_cache: number | null = null
	#locale: string | null = null

	_ready(): void {
		try {
			this.#locale = this.#keyfile.get_locale_for_key(GROUP_NAME, "Name", null)
		} catch {
			// Not having a name set is fine
			this.#locale = null
		}
	}

	save(): void {
		// Add key values that might be missing, but won't be edited
		this.#keyfile.set_string(GROUP_NAME, "Type", "Application")
		this.#keyfile.save_to_file(this.path)
	}

	async trash(): Promise<void> {
		this.#file.trash_async(GLib.PRIORITY_DEFAULT_IDLE, null)
	}
}
