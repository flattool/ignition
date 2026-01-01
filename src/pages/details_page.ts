import Adw from "gi://Adw?version=1"
import type Gtk from "gi://Gtk?version=4.0"

import { GClass, Property, Child, from, OnSignal, Notify, next_idle, Debounce } from "../gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { SharedVars } from "../utils/shared_vars.js"
import { IconHelper } from "../utils/icon_helper.js"
import { DelayHelper } from "../utils/delay_helper.js"
import { idle_run } from "../utils/helper_funcs.js"

const DELAY_FILE_SUFFIX = ".ignition_delay.sh"
const NAME_REGEX = /^(?! )[^\0\/"'\\]+(?: [^\0\/"'\\]+)*(?<! )$/
const EXEC_REGEX = /^\S(?:.*\S)?$/

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/details_page.ui" })
export class DetailsPage extends from(Adw.NavigationPage, {
	is_valid: Property.bool(),
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
	declare __entry: AutostartEntry | null
	override get entry(): AutostartEntry | null { return this.__entry }
	@Notify override set entry(val: AutostartEntry | null) {
		this.__entry = val
		this.header_title = val == null ? _("New Entry") : (val.name || SharedVars.default_name)
		idle_run(() => IconHelper.set_icon(this._app_icon, val?.icon))
	}

	protected _on_save(): void {
		print("save clicked!")
	}

	protected _on_create(): void {
		print("create clicked!")
	}

	protected _on_trash(): void {
		print("trash clicked!")
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
