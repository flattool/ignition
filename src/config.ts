import Gio from "gi://Gio?version=2.0";

// JSON structure
interface ConfigJson {
	APP_ID: string;
	VERSION: string;
	PROFILE: string;
}

export class Config {
	static json_?: ConfigJson;

	private static load_json(): ConfigJson {
		const resource = Gio.resources_lookup_data(
			"/io/github/flattool/Ignition/js/config.json",
			Gio.ResourceLookupFlags.NONE,
		);
		const bytes = resource.toArray();
		const jsonString = new TextDecoder("utf-8").decode(bytes);
		const parsed = JSON.parse(jsonString);
		return parsed;
	}
	private static get config(): ConfigJson {
		if (this.json_ === undefined) {
			this.json_ = this.load_json();
		}
		return this.json_;
	}

	static get APP_ID(): string {
		return this.config.APP_ID;
	}
	static get VERSION(): string {
		return this.config.VERSION;
	}
	static get PROFILE(): string {
		return this.config.PROFILE;
	}
}
