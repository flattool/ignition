import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"

import { GClass, from, Child, Property, next_idle, OnSignal, PostInit } from "../2gobjectify/gobjectify.js"
import { AutostartEntry } from "../utils/autostart_entry.js"
import { IconHelper } from "../utils/icon_helper.js"
import { idle_run } from "../utils/helper_funcs.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/widgets/entry_row.ui" })
export class EntryRow extends from(Adw.ActionRow, {
	entry: Property.readonly.gobject(AutostartEntry),
	suffix_text: Property.readwrite.string(),
	show_suffix_info: Property.readwrite.bool(true),
	popover_text: Property.readwrite.string(),
	_prefix_image: Child<Gtk.Image>(),
	_suffix_label: Child<Gtk.Label>(),
	_info_button: Child<Gtk.MenuButton>(),
}) {
	constructor(params?: typeof EntryRow.$params) {
		super(params)
		this.title = this.entry?.name.markup_escape_text() ?? ""
		this.subtitle = this.entry?.comment.markup_escape_text() ?? ""
		this.entry?.$connect("notify", this.#update_status.bind(this))
		idle_run(() => IconHelper.set_icon(this._prefix_image, this.entry?.icon))
	}

	@PostInit
	@OnSignal("notify::show-suffix-info")
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
