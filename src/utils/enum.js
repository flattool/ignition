export class Enum {
	static DEFAULT = null;

	static get values() {
		return (
			Object.getOwnPropertyNames(this)
			.map(k => this[k])
			.filter(v => v instanceof this)
		);
	}

	value;

	constructor(value) {
		this.value = value;
	}

	static fromValue(value, fallback=this.DEFAULT) {
		return this.values.find(v => v.value === value) ?? fallback;
	}
}
