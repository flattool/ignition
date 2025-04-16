export class Signal {
	connections = [];

	emit(argument) {
		for (const func of this.connections) {
			func(argument);
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
