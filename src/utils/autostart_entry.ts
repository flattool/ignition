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

const base = from(GObject.Object, {
	enabled: Property.bool(),
	name: Property.string(),
	comment: Property.string(),
	exec: Property.string(),
	terminal: Property.bool(),
	icon: Property.string(),
	// delay: Property.double(),
	path: Property.string({ flags: "CONSTRUCT" }),
	override_state: Property.string({ default: "NONE" }).as<AutostartEntry.OverrideState>(),
})

@GClass()
export class AutostartEntry extends base {
	static verify_file(path: string): "is_dir" | "not_exist" | "symlink" | "not_desktop_entry" | "" {
		if (!path.endsWith(".desktop")) return "not_desktop_entry"
		const file = Gio.File.new_for_path(path)
		if (!file.query_exists(null)) return "not_exist"
		const kind: Gio.FileType = file.query_file_type(Gio.FileQueryInfoFlags.NONE, null)
		if (kind === Gio.FileType.DIRECTORY) return "is_dir"
		if (kind === Gio.FileType.SYMBOLIC_LINK) return "symlink"
		return ""
	}

	static compare(a: AutostartEntry, b: AutostartEntry): -1 | 1 {
		const rank = (e: AutostartEntry): number => {
			if (e.override_state === "OVERRIDDEN") return 2
			return e.enabled ? 0 : 1
		}

		const rank_a: number = rank(a)
		const rank_b: number = rank(b)

		if (rank_a !== rank_b) return rank_a < rank_b ? -1 : 1
		if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1
		return 1
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

	get delay(): number {
		if (this.#delay_cache != null) return this.#delay_cache
		this.#load_delay()
		return this.#delay_cache ?? 0
	}

	get delayed_exec(): string {
		if (this.#delayed_exec_cache) return this.#delayed_exec_cache
		this.#load_delay()
		return this.#delayed_exec_cache
	}

	readonly #file = Gio.File.new_for_path(this.path)
	readonly #keyfile = new GLib.KeyFile()
	#locale: string | null = null
	#delay_cache: number | null = null
	#delayed_exec_cache = ""

	constructor(...params: ConstructorParameters<typeof base>) {
		super(...params)
		this.#load()
	}

	is_hidden(): boolean {
		return (
			this.#keyfile.get_boolean_safe(GROUP_NAME, "Hidden", false)
			|| this.#keyfile.get_boolean_safe(GROUP_NAME, "NoDisplay", false)
		)
	}

	save(): void {
		// Add key values that might be missing, but won't be edited
		this.#keyfile.set_string(GROUP_NAME, "Type", "Application")
		this.#keyfile.save_to_file(this.path)
	}

	async trash(): Promise<void> {
		this.#file.trash_async(GLib.PRIORITY_DEFAULT_IDLE, null)
	}

	reload(): void {
		this.#load()
	}

	#load(): void {
		const origin = Gio.File.new_for_path(this.path)
		if (!origin.query_exists(null)) {
			origin.create(Gio.FileCreateFlags.NONE, null)
		}
		this.#keyfile.load_from_file(this.path, GLib.KeyFileFlags.KEEP_TRANSLATIONS)
		try {
			this.#locale = this.#keyfile.get_locale_for_key(GROUP_NAME, "Name", null)
		} catch {
			// Not having a name set is fine
			this.#locale = null
		}
	}

	#load_delay(): void {
		const raw_exec = this.exec
		if (!raw_exec.endsWith(".ignition_delay.sh")) return
		const [delay, delayed_exec, error] = DelayHelper.load_delay(Gio.File.new_for_path(raw_exec))
		if (error) return
		this.#delay_cache = delay
		this.#delayed_exec_cache = delayed_exec
	}
}
