import Adw from "gi://Adw?version=1"
import Gio from "gi://Gio?version=2.0"
import type Gtk from "gi://Gtk?version=4.0"

import { GClass, Property, from, Child, connect_async, Notify } from "../gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { SharedVars } from "../utils/shared_vars.js"
import { IconHelper } from "../utils/icon_helper.js"
import { DelayHelper } from "../utils/delay_helper.js"

const DELAY_FILE_SUFFIX = ".ignition_delay.sh"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/details_page.ui" })
export class DetailsPage extends from(Adw.NavigationPage, {
	entry: Property.gobject(AutostartEntry),
	pending_enabled: Property.bool(),
	pending_name: Property.string(),
	pending_comment: Property.string(),
	pending_exec: Property.string(),
	pending_show_terminal: Property.bool(),
	pending_delay: Property.double(),
	_app_icon: Child<Gtk.Image>(),
}) {
	#delay_exec = ""

	private __entry: AutostartEntry | null = null
	override get entry(): AutostartEntry | null { return this.__entry }
	@Notify
	override set entry(val: AutostartEntry | null) {
		this.__entry = val
		IconHelper.set_icon(this._app_icon, val?.icon)
		this.pending_enabled = val?.enabled ?? true
		this.pending_name = val?.name ?? ""
		this.pending_comment = val?.comment ?? ""
		this.pending_show_terminal = val?.terminal ?? false
		this.#delay_exec = ""
		this.pending_exec = val?.exec ?? ""
		this.pending_delay = 0.0
		if (!val?.exec.endsWith(DELAY_FILE_SUFFIX) || val.delay === 0) return
		const delay_file = Gio.File.new_for_path(val.exec)
		const [delay, exec, error] = DelayHelper.load_delay(delay_file)
		if (error) return
		this.#delay_exec = val.exec
		this.pending_exec = exec
		this.pending_delay = delay
	}

	protected _on_save(): void {
		const entry = this.entry ?? new AutostartEntry({
			path: `${SharedVars.home_autostart_dir.get_path() ?? ""}/${this.pending_name}.desktop`,
		})
		entry.enabled = this.pending_enabled
		entry.name = this.pending_name
		entry.comment = this.pending_comment
		entry.terminal = this.pending_show_terminal
		if (this.#delay_exec) {
			// delay_exec is known to point to an existing file
			const delay_file = Gio.File.new_for_path(this.#delay_exec)
			if (this.pending_delay > 0) {
				DelayHelper.save_delay(delay_file, this.pending_delay, this.pending_exec)
				entry.exec = this.#delay_exec
			} else {
				delay_file.trash(null)
				entry.exec = this.pending_exec
			}
		} else if (this.pending_delay > 0) {
			const delay_path: string = (
				`${SharedVars.home_autostart_dir.get_path() ?? ""}/${this.pending_name}${DELAY_FILE_SUFFIX}`
			)
			DelayHelper.save_delay(Gio.File.new_for_path(delay_path), this.pending_delay, this.pending_exec)
			entry.exec = delay_path
		} else {
			entry.exec = this.pending_exec
		}
		entry.save()
		this.entry ??= entry
		this.activate_action("navigation.pop", null)
	}

	protected _is_root_autostart(): boolean {
		if (!this.entry) return false
		return this.entry.path.includes(SharedVars.root_autostart_dir.get_path() ?? "")
	}

	protected async _on_trash(): Promise<void> {
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
		await this.entry?.trash()
		this.activate_action("navigation.pop", null)
	}
}
