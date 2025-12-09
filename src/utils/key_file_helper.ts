import GLib from "gi://GLib?version=2.0"

export class KeyFileHelper {
	static get_string_safe(
		keyfile: GLib.KeyFile,
		use_locale: boolean,
		group: string,
		key: string,
		fallback: string,
	): string {
		const func = (use_locale
			? keyfile.get_locale_string.bind(keyfile, group, key, null)
			: keyfile.get_string.bind(keyfile, group, key)
		)
		try {
			return func()
		} catch (e) {
			return fallback
		}
	}

	static get_boolean_safe(keyfile: GLib.KeyFile, group: string, key: string, fallback: boolean): boolean {
		try {
			return keyfile.get_boolean(group, key)
		} catch (e) {
			return fallback
		}
	}

	static get_int64_safe(keyfile: GLib.KeyFile, group: string, key: string, fallback: number): number {
		try {
			return keyfile.get_int64(group, key)
		} catch (e) {
			return fallback
		}
	}
}
