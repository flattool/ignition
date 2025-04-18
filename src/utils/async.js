const { GLib } = imports.gi;

export class Async {
	static CONTINUE = GLib.SOURCE_CONTINUE;
	static BREAK = GLib.SOURCE_REMOVE;

	static run(to_run, when_done = () => { }) {
		GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
			const response = to_run();
			if (response === Async.CONTINUE) {
				return Async.CONTINUE;
			}

			when_done();
			return Async.BREAK;
		});
	}

	static run_pipe(tasks = [], when_done = () => { }) {
		if (tasks.length < 1) {
			when_done();
			return;
		}

		const [first_task, ...rest] = tasks;

		Async.run(
			first_task,
			() => Async.run_pipe(rest, when_done),
		);
	}
}
