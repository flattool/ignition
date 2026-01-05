import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"
import GLib from "gi://GLib?version=2.0"
import type Gtk from "gi://Gtk?version=4.0"

import {
	GClass,
	Property,
	Child,
	OnSignal,
	Notify,
	Debounce,
	from,
	next_idle,
	connect_async,
} from "../gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { SharedVars } from "../utils/shared_vars.js"
import { IconHelper } from "../utils/icon_helper.js"
import { DelayHelper } from "../utils/delay_helper.js"
import { idle_run } from "../utils/helper_funcs.js"

Gio._promisify(Gio.File.prototype, "trash_async", "trash_finish")

const DELAY_FILE_SUFFIX = ".ignition_delay.sh"
const NAME_REGEX = /^(?! )[^\0\/"'\\]+(?: [^\0\/"'\\]+)*(?<! )$/
const EXEC_REGEX = /^\S(?:.*\S)?$/

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/details_page.ui" })
export class DetailsPage extends from(Adw.NavigationPage, {
	is_valid: Property.bool({ default: true }),
	is_different: Property.bool(),
	entry: Property.gobject(AutostartEntry),
	header_title: Property.string(),
	pending_enabled: Property.bool(),
	pending_name: Property.string({ default: "-" }),
	pending_comment: Property.string(),
	pending_exec: Property.string({ default: "-" }),
	pending_show_terminal: Property.bool(),
	pending_delay: Property.double(),
	_app_icon: Child<Gtk.Image>(),
}) {
	#delay_path = ""
	#invalid_items = new Set<unknown>()

	declare __entry: AutostartEntry | null
	override get entry(): AutostartEntry | null { return this.__entry }
	@Notify override set entry(val: AutostartEntry | null) {
		this.__entry = val

		this.#invalid_items.clear()
		this.header_title = val == null ? _("New Entry") : (val.name || SharedVars.default_name)
		idle_run(() => IconHelper.set_icon(this._app_icon, val?.icon))

		this.pending_enabled = val?.enabled ?? true
		this.pending_name = val?.name ?? ""
		this.pending_comment = val?.comment ?? ""
		this.pending_show_terminal = val?.terminal ?? false
		this.#sync_delay_and_exec_to_ui(val)
	}

	#sync_delay_and_exec_to_ui(entry: AutostartEntry | null): void {
		if (entry === null) {
			this.#delay_path = ""
			this.pending_exec = ""
			this.pending_delay = 0
			return
		}
		this.pending_delay = entry.delay
		if (this.pending_delay) {
			this.#delay_path = entry.exec
			this.pending_exec = entry.delayed_exec
		} else {
			this.#delay_path = ""
			this.pending_exec = entry.exec
		}
	}

	@OnSignal("notify::pending-enabled")
	@OnSignal("notify::pending-name")
	@OnSignal("notify::pending-comment")
	@OnSignal("notify::pending-exec")
	@OnSignal("notify::pending-show-terminal")
	@OnSignal("notify::pending-delay")
	@Debounce(5)
	async #check_differences(): Promise<void> {
		await next_idle()
		if (!this.entry) return
		const is_initially_different: boolean = (
			this.pending_enabled !== this.entry.enabled
			|| this.pending_name !== this.entry.name
			|| this.pending_comment !== this.entry.comment
			|| this.pending_show_terminal !== this.entry.terminal
			|| this.pending_delay !== this.entry.delay
		)
		this.is_different = is_initially_different || (Boolean(this.#delay_path)
			? this.pending_exec !== this.entry.delayed_exec
			: this.pending_exec !== this.entry.exec
		)
	}

	#check_valid(widget: Gtk.Widget, text: string, regex: RegExp): void {
		if (!this.pending_name) {
			widget.remove_css_class("error")
			this.#invalid_items.add(widget)
		} else if (regex.test(text)) {
			widget.remove_css_class("error")
			this.#invalid_items.delete(widget)
		} else {
			widget.add_css_class("error")
			this.#invalid_items.add(widget)
		}
		this.is_valid = this.#invalid_items.size === 0
	}

	#save_delay(): void {
		if (this.entry == null) return
		const delay_file = Gio.File.new_for_path(this.#delay_path)
		if (this.pending_delay) {
			if (delay_file.query_exists(null)) {
				DelayHelper.save_delay(delay_file, this.pending_delay, this.pending_exec)
			} else {
				const delay_name = this.entry.file_name.replace(/\.desktop$/, ".ignition_delay.sh")
				const new_delay_path = `${SharedVars.home_autostart_dir.get_path()}/${delay_name}`
				const new_delay_file = Gio.File.new_for_path(new_delay_path)
				DelayHelper.save_delay(new_delay_file, this.pending_delay, this.pending_exec)
				this.entry.exec = new_delay_path
			}
		} else if (delay_file.query_exists(null)) {
			this.entry.exec = this.entry.delayed_exec
			delay_file.trash_async(GLib.PRIORITY_DEFAULT_IDLE, null).catch(print)
		}
	}

	protected async _on_name_changed(row: Adw.EntryRow): Promise<void> {
		await next_idle()
		this.#check_valid(row, this.pending_name, NAME_REGEX)
	}

	protected async _on_exec_changed(row: Adw.EntryRow): Promise<void> {
		await next_idle()
		this.#check_valid(row, this.pending_exec, EXEC_REGEX)
	}

	protected _on_save(): void {
		if (!this.is_valid || !this._is_home_autostart() || this.entry == null) return
		this.entry.enabled = this.pending_enabled
		this.entry.name = this.pending_name
		this.entry.comment = this.pending_comment
		this.entry.terminal = this.pending_show_terminal
		this.#save_delay()
		this.entry.save()
		this.activate_action("navigation.pop", null)
		this.entry = this.entry
	}

	protected _on_create(): void {
		print("create clicked!")
	}

	protected async _on_trash(): Promise<void> {
		if (!this._is_home_autostart()) return

		const dialog = new Adw.AlertDialog({
			heading: _("Trash Entry?"),
			body: _("This entry will be moved to the trash, and will no longer start when you log in."),
		})
		dialog.add_response("cancel", _("Cancel"))
		dialog.add_response("continue", _("Trash"))
		dialog.set_response_appearance("continue", Adw.ResponseAppearance.DESTRUCTIVE)
		dialog.present(this)

		const [response] = await connect_async<[string]>(dialog, "response")
		if (response !== "continue") return

		if (this.#delay_path) {
			const delay_file = Gio.File.new_for_path(this.#delay_path)
			if (delay_file.query_exists(null)) {
				await delay_file.trash_async(GLib.PRIORITY_DEFAULT_IDLE, null)
			}
		}

		await this.entry?.trash()
		this.activate_action("navigation.pop", null)
		this.entry = this.entry
	}

	protected _can_save(): boolean {
		return this.is_valid && this.is_different
	}

	protected _can_create(): boolean {
		return this.is_valid
	}

	protected _is_home_autostart(): boolean {
		return this.entry != null && this.entry.path.includes(SharedVars.home_autostart_dir.get_path()!)
	}

	protected _is_root_autostart(): boolean {
		return this.entry != null && this.entry.path.includes(SharedVars.root_autostart_dir.get_path()!)
	}

	protected _is_app_or_new_entry(): boolean {
		return !this._is_home_autostart() && !this._is_root_autostart()
	}
}
