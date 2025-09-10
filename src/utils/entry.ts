import Gio from "gi://Gio?version=2.0"
import GLib from "gi://GLib?version=2.0"
import GObject from "gi://GObject?version=2.0"

import { GObjectify } from "./gobjectify.js"
import { SharedVars } from "./shared_vars.js"
import { get_bool_safe, get_string_safe } from "./key_file_helpers.js"

export namespace Entry {
	export type OveriddenState = "none" | "overrides" | "overridden"
}

@GObjectify.Class()
export class Entry extends GObject.Object {
	@GObjectify.Property("string")
	public accessor title!: string

	@GObjectify.Property("string")
	public accessor comment!: string

	@GObjectify.Property("bool")
	public accessor enabled!: boolean

	@GObjectify.Property("string")
	public accessor icon!: string

	@GObjectify.Property("string")
	public accessor exec!: string

	@GObjectify.Property("bool")
	public accessor no_display!: boolean

	@GObjectify.Property("bool")
	public accessor terminal!: boolean

	@GObjectify.Property("string", { default: "none" })
	public accessor override_state!: Entry.OveriddenState

	@GObjectify.CustomProp("string")
	public get path(): string { return this.file.get_path() ?? "" }

	@GObjectify.CustomProp("bool")
	public get is_user_entry(): boolean {
		return this.path.includes(SharedVars.home_autostart_dir.get_path() ?? "")
	}

	@GObjectify.Property(Gio.File, {
		flags: "CONSTRUCT",
		effect() {
			this.notify("is-user-entry")
			this.notify("path")
		},
	}) public accessor file!: Gio.File

	private readonly keyfile = new GLib.KeyFile()

	public constructor(params: { file: Gio.File }) {
		// @ts-expect-error: GObject has no construct param, but we need to pass our own properties to super
		super(params)
		this.load()
	}

	public load(): void {
		this.keyfile.load_from_file(this.path, GLib.KeyFileFlags.KEEP_TRANSLATIONS)
		this.title = get_string_safe(this.keyfile, { key: "Name", fallback: SharedVars.default_name, use_locale: true })
		this.comment = get_string_safe(
			this.keyfile,
			{ key: "Comment", fallback: SharedVars.default_comment, use_locale: true },
		)
		this.enabled = !get_bool_safe(this.keyfile, { key: "Hidden", fallback: false })
		this.icon = get_string_safe(this.keyfile, { key: "Icon", fallback: "" })
		this.exec = get_string_safe(this.keyfile, { key: "Exec", fallback: "" })
		this.no_display = get_bool_safe(this.keyfile, { key: "NoDisplay", fallback: false })
		this.terminal = get_bool_safe(this.keyfile, { key: "Terminal", fallback: false })
	}

	public save(): void {
		this.keyfile.set_string("Desktop Entry", "Name", this.title)
		this.keyfile.set_string("Desktop Entry", "Comment", this.comment)
		this.keyfile.set_boolean("Desktop Entry", "Hidden", this.enabled)
		this.keyfile.set_string("Desktop Entry", "Icon", this.icon)
		this.keyfile.set_string("Desktop Entry", "Exec", this.exec)
		this.keyfile.set_boolean("Desktop Entry", "NoDisplay", this.no_display)
		this.keyfile.set_boolean("Desktop Entry", "Terminal", this.terminal)
		this.keyfile.save_to_file(this.path)
	}
}
