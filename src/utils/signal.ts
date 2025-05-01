export class Signal <Args extends any[] = []> {
	private readonly connections: Array<(...args: Args) => void> = [];

	emit(...args: Args) {
		this.connections.forEach(func => func(...args));
	}

	connect(func: (...args: Args) => void) {
		this.connections.push(func);
	}

	disconnect(func: (...args: Args) => void) {
		const index = this.connections.indexOf(func);
		if (index !== -1) {
			this.connections.splice(index, 1);
		}
	}
}
