import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"

import { GClass, from, Child, Property, next_idle } from "../gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { IconHelper } from "../utils/icon_helper.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/widgets/entry_row.ui" })
export class EntryRow extends from(Adw.ActionRow, {
	entry: Property.gobject(AutostartEntry, { flags: "CONSTRUCT_ONLY" }),
	suffix_text: Property.string(),
	show_suffix_info: Property.bool({ default: true }),
	popover_text: Property.string(),
	_prefix_image: Child<Gtk.Image>(),
	_suffix_label: Child<Gtk.Label>(),
	_info_button: Child<Gtk.MenuButton>(),
}) {
	async _ready(): Promise<void> {
		this.title = this.entry?.name.markup_escape_text() ?? ""
		this.subtitle = this.entry?.comment.markup_escape_text() ?? ""
		this.entry?.connect("notify", this.#update_status.bind(this))
		this.connect("notify::show-suffix-info", this.#update_status.bind(this))
		this.#update_status()
		await next_idle()
		IconHelper.set_icon(this._prefix_image, this.entry?.icon)
	}

	#update_status(): void {
		const state: AutostartEntry.OverrideState = this.entry?.override_state ?? "NONE"
		const enabled: boolean = this.entry?.enabled ?? false
		const should_warn: boolean = state === "OVERRIDDEN" || !enabled
		this.activatable = state !== "OVERRIDDEN"
		this._info_button.visible = this.show_suffix_info && state !== "NONE"

		if (should_warn) {
			this._suffix_label.add_css_class("warning")
			this._prefix_image.opacity = 0.4
		} else {
			this._suffix_label.remove_css_class("warning")
			this._prefix_image.opacity = 1
		}

		if (!this.show_suffix_info) return

		if (enabled) {
			const delay: number = this.entry?.delay ?? 0
			if (delay > 0) {
				// Translators: %d is the number of seconds of delay before the app starts
				this.suffix_text = _("Starts after %d seconds").format(delay)
			} else {
				this.suffix_text = _("Enabled")
			}
		} else {
			this.suffix_text = _("Disabled")
		}

		if (state === "OVERRIDDEN") {
			this.popover_text = _("This entry is overridden by a user entry.")
			if (this.show_suffix_info) this.suffix_text = _("Overridden")
		} else if (state === "OVERRIDES") {
			this.popover_text = _("This entry overrides a system entry.")
		}
	}
}
