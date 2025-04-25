export class Signal {
	connections = [];

	emit() {
		for (const func of this.connections) {
			func(...arguments);
		}
	}

	connect(func) {
		this.connections.push(func);
	}

	disconnect(func) {
		this.connections = this.connections.filter((connection) => {
			return connection !== func;
		})
	}
}
