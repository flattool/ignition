const { GLib, Gio } = imports.gi;
import { KeyFileHelper } from './key_file_helper.js';
import { Signal } from './signal.js';
import { SharedVars } from './shared_vars.js';

export class AutostartEntry {
	file;
	keyfile = new GLib.KeyFile({});
	locale;
	signals = {
		file_saved: new Signal(),
		file_save_failed: new Signal(),
		file_trashed: new Signal(),
		file_trash_failed: new Signal(),
	};

	get path() {
		return this.file.get_path();
	}

	get file_name() {
		return this.file.get_basename();
	}

	get name() {
		return KeyFileHelper.get_string_safe(this.keyfile, true, "Desktop Entry", "Name", "");
	}

	get comment() {
		return KeyFileHelper.get_string_safe(this.keyfile, true, "Desktop Entry", "Comment", "");
	}

	get exec() {
		return KeyFileHelper.get_string_safe(this.keyfile, false, "Desktop Entry", "Exec", "");
	}

	get terminal() {
		return KeyFileHelper.get_boolean_safe(this.keyfile, "Desktop Entry", "Terminal", false);
	}

	get enabled() {
		return ! KeyFileHelper.get_boolean_safe(this.keyfile, "Desktop Entry", "Hidden", false);
	}

	get icon() {
		return KeyFileHelper.get_string_safe(this.keyfile, false, "Desktop Entry", "Icon", "");
	}

	set path(value) {
		this.file = Gio.File.new_for_path(value);
	}

	set name(value) {
		this.keyfile.set_string("Desktop Entry", "Name", value);
		if (this.locale !== null) {
			this.keyfile.set_locale_string("Desktop Entry", "Name", this.locale, value);
		}
	}

	set comment(value) {
		this.keyfile.set_string("Desktop Entry", "Comment", value);
		if (this.locale !== null) {
			this.keyfile.set_locale_string("Desktop Entry", "Comment", this.locale, value);
		}
	}

	set exec(value) {
		this.keyfile.set_string("Desktop Entry", "Exec", value);
	}

	set terminal(value) {
		this.keyfile.set_boolean("Desktop Entry", "Terminal", value);
	}

	set enabled(value) {
		this.keyfile.set_boolean("Desktop Entry", "Hidden", ! value);
	}

	set icon(value) {
		this.keyfile.set_string("Desktop Entry", "Icon", value);
	}

	constructor(path) {
		this.path = path;
		if (!this.file.query_exists(null)) {
			return;
		}
		// This will error if the file cannot be interpreted as a keyfile
		this.keyfile.load_from_file(this.path, GLib.KeyFileFlags.KEEP_TRANSLATIONS);

		// This will error if the Type key isn't found,
		//    and will raise a new error if the type
		//    isn't "Application" (needed for executing)
		if (this.keyfile.get_string("Desktop Entry", "Type") !== "Application") {
			throw new Error("Desktop Entry is not of type Application");
		}
		try {
			this.locale = this.keyfile.get_locale_for_key("Desktop Entry", "Name", null);
		} catch (error) {
			// Not having a name set is fine
			this.locale = null;
		}
	}

	save() {
		if (!this.file.query_exists(null)) {
			this.path = `${SharedVars.home_dir.get_path()}/${this.name}.desktop`;
		}
		try {
			// Add key values that might be missing, but won't be edited
			this.keyfile.set_string("Desktop Entry", "Type", "Application");

			this.keyfile.save_to_file(this.path);
			this.signals.file_saved.emit(this);
		} catch (error) {
			this.signals.file_save_failed.emit(error);
		}
	}

	trash() {
		const callback = (file, result) => {
			try {
				file.trash_finish(result);
				this.signals.file_trashed.emit(this);
			} catch (error) {
				this.signals.file_trash_failed.emit(error);
			}
		};
		this.file.trash_async(
			GLib.PRIORITY_DEFAULT_IDLE,
			null,
			callback,
		);
	}
}
