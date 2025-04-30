import { Async } from "../utils/async.js";
import { AutostartEntry } from "../utils/autostart_entry.js";
import { DelayHelper } from "../utils/delay_helper.js";
import { IconHelper } from "../utils/icon_helper.js";
import { KeyFileHelper } from "../utils/key_file_helper.js";
import { SharedVars } from "../utils/shared_vars.js";
import { Signal } from "../utils/signal.js";
import { add_error_toast, add_toast } from "../utils/helper_funcs.js";

import GObject from "gi://GObject?version=2.0";
import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw?version=1";

enum Origins {
	HOST_APP,
	ROOT,
	HOME,
	NEW,
	DEFAULT = Origins.NEW,
}

class Details {
	enabled: boolean;
	name: string;
	comment: string;
	exec: string;
	terminal: boolean;
	delay: number;

	constructor(enabled = true, name = '', comment = '', exec = '', terminal = false, delay = 0) {
		this.enabled = enabled;
		this.name = name;
		this.comment = comment;
		this.exec = exec;
		this.terminal = terminal;
		this.delay = delay;
	}

	clone() {
		return new Details(this.enabled, this.name, this.comment, this.exec, this.terminal, this.delay);
	}

	is_equal(other: Details): boolean {
		return (
			this.enabled === other.enabled
			&& this.name === other.name
			&& this.comment === other.comment
			&& this.exec === other.exec
			&& this.terminal === other.terminal
			&& this.delay === other.delay
		);
	}
}

export class DetailsPage extends Adw.NavigationPage {
	static {
		GObject.registerClass({
			GTypeName: "DetailsPage",
			Template:
				"resource:///io/github/flattool/Ignition/main_view/details-page.ui",
			InternalChildren: [
				'header_bar',
					"trash_button",
					"save_button",
					"create_button",
				"root_banner",
					'scrolled_window',
						"content_box",
							"icon",
							"title_group",
							"enabled_row",
							"name_row",
							"comment_row",
							"exec_row",
								"path_info_button",
							"terminal_row",
							"delay_adjustment",
				"path_info_popover",
				"create_dialog",
				"override_dialog",
				"trash_dialog",
			],
		}, this);
	}

	static Origins = Origins;

	readonly _header_bar!: Adw.HeaderBar;
	readonly _save_button!: Gtk.Button;
	readonly _create_button!: Gtk.Button;
	readonly _trash_button!: Gtk.Button;
	readonly _root_banner!: Adw.Banner;
	readonly _scrolled_window!: Gtk.ScrolledWindow;
	readonly _content_box!: Gtk.Box;
	readonly _icon!: Gtk.Image;
	readonly _title_group!: Adw.PreferencesGroup;
	readonly _enabled_row!: Adw.SwitchRow;
	readonly _name_row!: Adw.EntryRow;
	readonly _comment_row!: Adw.EntryRow;
	readonly _exec_row!: Adw.EntryRow;
	readonly _path_info_button!: Gtk.MenuButton;
	readonly _terminal_row!: Adw.SwitchRow;
	readonly _delay_adjustment!: Gtk.Adjustment;
	readonly _path_info_popover!: Gtk.Popover;
	readonly _create_dialog!: Adw.AlertDialog;
	readonly _override_dialog!: Adw.AlertDialog;
	readonly _trash_dialog!: Adw.AlertDialog;

	entry: AutostartEntry = new AutostartEntry("");
	origin = DetailsPage.Origins.DEFAULT;
	details_on_disks = new Details();
	gui_details = new Details();

	readonly signals = {
		pop_request: new Signal(),
	} as const;

	invalid_rows = new Set<Adw.EntryRow>();

	file_name_regex = /^(?! )[^\0\/"'.\\]+(?: [^\0\/"'.\\]+)*(?<! )$/;
	exec_regex = /^\S(?:.*\S)?$/;

	get is_saving_allowed(): boolean {
		return (
			this.origin === DetailsPage.Origins.HOME
			&& this.entry.file.query_exists(null)
		);
	}
	get is_trashing_allowed(): boolean {
		return this.is_saving_allowed
	}
	get is_creating_allowed(): boolean {
		return (
			this.origin === DetailsPage.Origins.HOST_APP
			|| this.origin === DetailsPage.Origins.NEW
		) && !this.entry.file.query_exists(null);
	}
	get is_overriding_allowed(): boolean {
		return (
			this.origin === DetailsPage.Origins.ROOT
			&& !this.entry.file.query_exists(null)
		);
	}

	constructor(params?: Adw.NavigationPage.ConstructorProps) {
		super(params);

		// Connections
		this._enabled_row.connect('notify::active', () => this.set_gui_detail('enabled', this._enabled_row.active));
		this._name_row.connect('changed', () => {
			const text = this._name_row.text;
			this.validate_input(this._name_row, text.length > 0 && this.file_name_regex.test(text));
			this.set_gui_detail('name', text);
		});
		this._comment_row.connect('changed', () => this.set_gui_detail('comment', this._comment_row.text));
		this._exec_row.connect('changed', () => {
			const text = this._exec_row.text;
			this.validate_input(this._exec_row, text.length > 0 && this.exec_regex.test(text));
			this.set_gui_detail('exec', text);
		});
		this._terminal_row.connect(
			'notify::active', () => this.set_gui_detail('terminal', this._terminal_row.active)
		);

		this._name_row.connect('entry-activated', () => {
			this.on_create();
			this.on_save();
		});
		this._comment_row.connect('entry-activated', () => {
			this.on_create();
			this.on_save();
		});
		this._exec_row.connect('entry-activated', () => {
			this.on_create();
			this.on_save();
		});

		this._save_button.connect('clicked', () => this.on_save());
		this._create_button.connect('clicked', () => this.on_create());
		this._root_banner.connect('button-clicked', () => this.on_override());
		this._trash_button.connect('clicked', () => this.on_trash());

		this._create_dialog.connect('response', this.on_create_dialog_response.bind(this));
		this._override_dialog.connect('response', this.on_override_dialog_response.bind(this));
		this._trash_dialog.connect('response', this.on_trash_dialog_response.bind(this));

		this._delay_adjustment.connect('value-changed', adj => this.set_gui_detail('delay', adj.value));

		const save_action = SharedVars.application?.lookup_action('save-edits');
		if (save_action) save_action.connect('activate', () => {
			this.on_save();
			this.on_create();
		});
	}

	load_details(entry: AutostartEntry, origin: Origins): void {
		this.entry = entry;
		this.origin = origin;

		const is_new = origin === DetailsPage.Origins.NEW;

		// Get the startup delay, if any
		const raw_exec = this.entry.exec;
		let [delay, display_exec, load_error] = (raw_exec.endsWith('.ignition_delay.sh')
			? DelayHelper.load_delay(Gio.File.new_for_path(raw_exec))
			: [0, raw_exec, null]
		);

		if (load_error) {
			print(load_error);
		}

		this.details_on_disks = new Details(
			this.entry.enabled,
			is_new ? "" : (this.entry.name || SharedVars.default_name),
			this.entry.comment || "",
			display_exec,
			this.entry.terminal,
			delay,
		);

		if (origin === DetailsPage.Origins.HOST_APP || origin === DetailsPage.Origins.ROOT) {
			entry.path = `${SharedVars.home_autostart_dir.get_path()}/${entry.file_name}`;
		}

		this._save_button.visible = this.is_saving_allowed;
		this._create_button.visible = this.is_creating_allowed;
		this._root_banner.revealed = this.is_overriding_allowed;
		this._trash_button.visible = this.is_trashing_allowed;

		this.sync_details_to_ui();

		this._scrolled_window.vadjustment.value = 0;
	}

	validate_input(row: Adw.EntryRow, test: boolean): void {
		if (test) {
			row.remove_css_class('error');
			this.invalid_rows.delete(row);
		} else {
			row.add_css_class('error');
			this.invalid_rows.add(row);
		}
	}

	sync_details_to_ui(): void {
		Async.run(() => {
			IconHelper.set_icon(this._icon, this.entry.icon);
			return Async.BREAK;
		});

		this.gui_details = this.details_on_disks.clone();

		this._enabled_row.active = this.gui_details.enabled;
		this._name_row.text = this.gui_details.name;
		this._comment_row.text = this.gui_details.comment;
		this._exec_row.text = this.gui_details.exec;
		this._terminal_row.active = this.gui_details.terminal;
		this._delay_adjustment.value = this.gui_details.delay;

		this._title_group.title = (this.origin === DetailsPage.Origins.NEW
			? _("New Entry")
			: GLib.markup_escape_text(this.gui_details.name || SharedVars.default_name, -1)
		);
	}

	set_gui_detail<K extends keyof Details>(key: K, value: Details[K]): void {
		this.gui_details[key] = value;

		this._save_button.sensitive = (
			this.invalid_rows.size == 0
			&& this.is_saving_allowed
			&& this.is_edited()
		);
		this._create_button.sensitive = (
			this.invalid_rows.size == 0
			&& this.is_creating_allowed
		);
	}

	is_edited(): boolean {
		return !this.details_on_disks.is_equal(this.gui_details);
	}

	sync_details_to_entry(): void {
		this.entry.enabled = this.gui_details.enabled;
		this.entry.name = this.gui_details.name;
		this.entry.comment = this.gui_details.comment;
		this.entry.terminal = this.gui_details.terminal;

		if (this.origin === DetailsPage.Origins.NEW) {
			const new_name = this.gui_details.name.replace(/\s+/g, '_');
			this.entry.path = `${SharedVars.home_autostart_dir.get_path()}/${new_name}.desktop`;
		}

		// Removing values that interfier with expected startup behavior
		if (KeyFileHelper.get_boolean_safe(this.entry.keyfile, "Desktop Entry", "DBusActivatable", false)) {
			this.entry.keyfile.set_boolean("Desktop Entry", "DBusActivatable", false);
		}

		// Setting the exec value with its sleep delay, if any
		const delay = this.gui_details.delay;
		const raw_exec = this.gui_details.exec;

		const delay_name = this.entry.file_name.replace(".desktop", ".ignition_delay.sh");
		const delay_path = `${SharedVars.home_autostart_dir.get_path()}/${delay_name}`;
		const delay_file = Gio.File.new_for_path(delay_path);

		let final_exec = raw_exec;

		if (delay > 0) {
			const delay_error = DelayHelper.save_delay(delay_file, delay, raw_exec);
			if (delay_error) {
				print(delay_error);
			} else {
				final_exec = delay_path;
			}
		} else if (
			delay_file.query_exists(null)
			&& delay_file.query_file_type(
				Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
				null,
			) === Gio.FileType.REGULAR
		) {
			try {
				delay_file.trash(null);
			} catch (error) {
				print(`failed to trash delay file at path: ${delay_path}`);
			}
		}

		this.entry.exec = final_exec;
	}

	on_save(): void {
		if (!this.is_saving_allowed || !this._save_button.sensitive) {
			return;
		}
		this.sync_details_to_entry();
		this.entry.save((file, err) => {
			if (err === null) {
				add_toast(_("Saved details"));
			} else {
				add_error_toast(_("Could not save file"), `${err}`);
			}
			this.signals.pop_request.emit();
		});
	}

	on_create(): void {
		if (!this.is_creating_allowed || !this._create_button.sensitive) {
			return;
		}
		this.sync_details_to_entry();
		if (this.entry.file.query_exists(null)) {
			this._create_dialog.present(SharedVars.main_window);
			this._create_dialog.grab_focus();
		} else {
			this.on_create_dialog_response(this._create_dialog, 'create_continue');
		}
	}

	on_create_dialog_response(dialog: Adw.Dialog, response: string): void {
		if (!this.is_creating_allowed || response !== 'create_continue') {
			return;
		}
		this.entry.save((file, err) => {
			if (err === null) {
				add_toast(_("Created entry"));
			} else {
				add_error_toast(_("Could not create file"), `${err}`);
			}
			this.signals.pop_request.emit();
		});
	}

	on_override(): void {
		if (!this.is_overriding_allowed) {
			return;
		}
		this._override_dialog.present(SharedVars.main_window);
		this._override_dialog.grab_focus();
	}

	on_override_dialog_response(dialog: Adw.Dialog, response: string): void {
		if (!this.is_overriding_allowed || response !== 'override_continue') {
			return;
		}
		this.sync_details_to_entry();
		this.entry.save((file, err) => {
			if (err === null) {
				add_toast(_("Overrode entry"));
				this.load_details(this.entry, DetailsPage.Origins.HOME);
			} else {
				add_error_toast(_("Could not create file"), `${err}`);
			}
		});
	}

	on_trash(): void {
		if (!this.is_trashing_allowed || !this._trash_button.sensitive) {
			return;
		}
		this._trash_dialog.present(SharedVars.main_window);
		this._trash_dialog.grab_focus();
	}

	on_trash_dialog_response(dialog: Adw.Dialog, response: string): void {
		if (!this.is_trashing_allowed || response !== 'trash_continue') {
			return;
		}

		// Trash delay file, if any
		const delay_name = this.entry.file_name.replace(".desktop", ".ignition_delay.sh");
		const delay_path = `${SharedVars.home_autostart_dir.get_path()}/${delay_name || Date.now()}`;
		const delay_file = Gio.File.new_for_path(delay_path);
		if (
			delay_file.query_exists(null)
			&& delay_file.query_file_type(
				Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
				null,
			) === Gio.FileType.REGULAR
		) {
			try {
				delay_file.trash(null);
			} catch (error) {
				print(error);
			}
		}

		this.entry.trash((file, err) => {
			if (err === null) {
				add_toast(_("Trashed entry"));
			} else {
				add_error_toast(_("Could not trash file"), `${err}`);
			}
			this.signals.pop_request.emit();
		});
	}
}
