import { DelayHelper } from "./delay_helper.js";
import { KeyFileHelper } from "./key_file_helper.js";
import { path_with_prefix } from "./helper_funcs.js";

import GLib from "gi://GLib?version=2.0"
import Gio from "gi://Gio?version=2.0"

enum Overrides {
	OVERRIDDEN,
	OVERRIDES,
	NONE,
	DEFAULT = Overrides.NONE,
}

export class AutostartEntry {
	static Overrides = Overrides

	file = Gio.File.new_for_path("")
	locale: string | null = null
	overridden = AutostartEntry.Overrides.NONE
	keyfile = new GLib.KeyFile({})

	get path(): string {
		return this.file.get_path() ?? ""
	}

	get file_name(): string {
		return this.file.get_basename() ?? ""
	}

	get name(): string {
		return KeyFileHelper.get_string_safe(this.keyfile, true, "Desktop Entry", "Name", "")
	}

	get comment(): string {
		return KeyFileHelper.get_string_safe(this.keyfile, true, "Desktop Entry", "Comment", "")
	}

	get exec(): string {
		return KeyFileHelper.get_string_safe(this.keyfile, false, "Desktop Entry", "Exec", "")
	}

	get terminal(): boolean {
		return KeyFileHelper.get_boolean_safe(this.keyfile, "Desktop Entry", "Terminal", false)
	}

	get enabled(): boolean {
		return !KeyFileHelper.get_boolean_safe(this.keyfile, "Desktop Entry", "Hidden", false)
	}

	get icon(): string {
		return KeyFileHelper.get_string_safe(this.keyfile, false, "Desktop Entry", "Icon", "")
	}

	get delay(): number {
		const raw_exec = this.exec;
		if (raw_exec.endsWith(".ignition_delay.sh")) {
			const [delay, , error] = DelayHelper.load_delay(Gio.File.new_for_path(raw_exec));
			if (!error) {
				return delay;
			}
		}
		return 0;
	}

	set path(value: string) {
		this.file = Gio.File.new_for_path(value)
	}

	set name(value: string) {
		this.keyfile.set_string("Desktop Entry", "Name", value)
		if (this.locale) {
			this.keyfile.set_locale_string("Desktop Entry", "Name", this.locale, value)
		}
	}

	set comment(value: string) {
		this.keyfile.set_string("Desktop Entry", "Comment", value)
		if (this.locale) {
			this.keyfile.set_locale_string("Desktop Entry", "Comment", this.locale, value)
		}
	}

	set exec(value: string) {
		this.keyfile.set_string("Desktop Entry", "Exec", value)
	}

	set terminal(value: boolean) {
		this.keyfile.set_boolean("Desktop Entry", "Terminal", value)
	}

	set enabled(value: boolean) {
		this.keyfile.set_boolean("Desktop Entry", "Hidden", !value)
	}

	set icon(value: string) {
		this.keyfile.set_string("Desktop Entry", "Icon", value)
	}

	constructor(path: string) {
		this.path = path

		// Handle Symlinks
		if (this.file.query_file_type(Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, null) === Gio.FileType.SYMBOLIC_LINK) {
			const target = this.file.query_info(
				"standard::type,standard::symlink-target",
				Gio.FileQueryInfoFlags.NONE,
				null,
			).get_symlink_target()
			if (target && target.startsWith("/")) this.path = path_with_prefix(target)
		}

		if (!this.file.query_exists(null)) {
			return
		}

		// This will error if the file cannot be interpreted as a keyfile
		this.keyfile.load_from_file(this.path, GLib.KeyFileFlags.KEEP_TRANSLATIONS)

		// This will error if the Type key isn't found,
		//    and will raise a new error if the type
		//    isn't "Application" (needed for executing)
		if (this.keyfile.get_string("Desktop Entry", "Type") !== "Application") {
			throw new Error("Desktop Entry is not of type Application")
		}
		try {
			this.locale = this.keyfile.get_locale_for_key("Desktop Entry", "Name", null)
		} catch (error) {
			// Not having a name set is fine
			this.locale = null
		}
	}

	save(on_finish: (arg0: AutostartEntry, arg1: unknown | null) => void): void {
		try {
			// Add key values that might be missing, but won't be edited
			this.keyfile.set_string("Desktop Entry", "Type", "Application")

			this.keyfile.save_to_file(this.path)
			on_finish(this, null)
		} catch (error) {
			on_finish(this, error)
		}
	}

	trash(on_finish: (arg0: AutostartEntry, arg1: unknown | null) => void): void {
		const callback: Gio.AsyncReadyCallback = (source, result) => {
			try {
				const file = source as Gio.File
				file.trash_finish(result)
				on_finish(this, null)
			} catch (error) {
				on_finish(this, error)
			}
		}
		this.file.trash_async(
			GLib.PRIORITY_DEFAULT_IDLE,
			null,
			callback,
		)
	}
}
