export class Config {
	static get APP_ID(): string {
		return pkg.app_id
	}
	static get VERSION(): string {
		return pkg.version
	}
	static get PROFILE(): string {
		return pkg.profile
	}
}
