export class KeyFileHelper {
	static #tryer(to_try, fallback=null) {
		try {
			return to_try() || fallback;
		} catch (error) {
			return fallback;
		}
	}

	static get_string_safe(keyfile, use_locale, group, key, fallback) {
		const func = (
			use_locale
			? keyfile.get_locale_string.bind(keyfile, group, key, null)
			: keyfile.get_string.bind(keyfile, group, key)
		);
		return KeyFileHelper.#tryer(func, fallback);
	}

	static get_boolean_safe(keyfile, group, key, fallback) {
		const func = keyfile.get_boolean.bind(keyfile, group, key);
		return KeyFileHelper.#tryer(func, fallback);
	}

	static get_int64_safe(keyfile, group, key, fallback) {
		const func = keyfile.get_int64.bind(keyfile, group, key);
		return KeyFileHelper.#tryer(func, fallback);
	}
}
