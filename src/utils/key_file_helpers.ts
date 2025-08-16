import GLib from "gi://GLib?version=2.0"

type KeyLookupParams<T> = {
	group?: string,
	key: string,
	fallback: T,
}

export function get_string_safe(
	keyfile: GLib.KeyFile,
	params: KeyLookupParams<string> & { use_locale?: boolean },
): string {
	try {
		if (params.use_locale) {
			return keyfile.get_locale_string(params.group ?? "Desktop Entry", params.key, null)
		}
		return keyfile.get_string(params.group ?? "Desktop Entry", params.key)
	} catch (error) {
		return params.fallback
	}
}

export function get_bool_safe(keyfile: GLib.KeyFile, params: KeyLookupParams<boolean>): boolean {
	try {
		return keyfile.get_boolean(params.group ?? "Desktop Entry", params.key)
	} catch (error) {
		return params.fallback
	}
}

export function get_int64_safe(keyfile: GLib.KeyFile, params: KeyLookupParams<number>): number {
	try {
		return keyfile.get_int64(params.group ?? "Desktop Entry", params.key)
	} catch (error) {
		return params.fallback
	}
}
