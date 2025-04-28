import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";

export class DelayHelper {
	static save_delay(file: Gio.File, delay: number, command: string) {
		const path = file.get_path() ?? "";
		const contents = `#!/usr/bin/env sh\nsleep ${delay} && ${command}\n`;

		try {
			GLib.file_set_contents(path, contents);
			GLib.chmod(path, 0o755);
		} catch (error) {
			return error;
		}

		return null;
	}

	static load_delay(file: Gio.File) {
		const path = file.get_path() ?? "";
		if (!file.query_exists(null)) {
			return [0, "", `no file at path: ${path}`];
		}

		if (!path.endsWith(".ignition_delay.sh")) {
			return [0, "", `DelayHelper.load_delay called with non ignition_delay file\npath: ${path}`];
		}

		try {
			const [data,] = file.load_bytes(null);
			const decoder = new TextDecoder('utf-8');
			const array = data.get_data() ?? 0;
			if (array === 0) {
				throw new Error("data.get_data returned null");
			}
			const contents = decoder.decode(array).split('\n');
			if (contents.length < 2) {
				return [0, "", `improperly constructed delay file\n[total lines under 2]\npath: ${path}`];
			}

			const delay_and_cmd = contents[1].trim().split(/\s+/);
			if (delay_and_cmd.length < 4) {
				return [0, "", `improperly constructed delay file\n[exec contents under 4 items]\npath: ${path}`];
			}

			const [, delay_text, , ...rest] = delay_and_cmd;
			let delay = parseInt(delay_text);
			if (isNaN(delay)) {
				return [0, "", `improperly constructed delay file\n[delay item is not a number]\npath: ${path}`];
			}

			return [delay, rest.join(' '), null];
		} catch (error) {
			return [0, "", `DelayHelper.load_delay encountered and unexpected error:\n${error}\nfor path: ${path}`];
		}
	}

	static remove_delay(file: Gio.File) {
		const path = file.get_path() ?? "";
		if (!file.query_exists(null)) {
			return ["", `no file at path: ${path}`];
		}

		if (!path.endsWith(".ignition_delay.sh")) {
			return ["", `DelayHelper.remove_delay called with non ignition_delay file\npath: ${path}`];
		}

		try {
			const [data,] = file.load_bytes(null);
			const array = data.get_data() ?? 0;
			if (array === 0) {
				throw new Error("data.get_data returned null");
			}
			const decoder = new TextDecoder('utf-8');
			const contents = decoder.decode(array).split('\n');

			if (contents.length < 2) {
				return ["", `improperly constructed delay file\n[total lines under 2]\npath: ${path}`];
			}

			const delay_and_cmd = contents[1].trim().split(/\s+/);
			if (delay_and_cmd.length < 4) {
				return ["", `improperly constructed delay file\n[exec contents under 4 items]\npath: ${path}`];
			}

			const [, delay_text, , ...rest] = delay_and_cmd;
			let delay = parseInt(delay_text);
			if (isNaN(delay)) {
				return ["", `improperly constructed delay file\n[delay item is not a number]\npath: ${path}`];
			}

			// Try to delete the file after extracting the command
			try {
				file.trash(null);
			} catch (deleteError) {
				return ["", `error while deleting delay file at path: ${path}\n${deleteError}`];
			}

			return [rest.join(' '), ""];
		} catch (error) {
			return ["", `DelayHelper.remove_delay encountered an unexpected error:\n${error}\nfor path: ${path}`];
		}
	}
}
