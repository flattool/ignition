import GLib from "gi://GLib?version=2.0"

export type AsyncResult = typeof GLib.SOURCE_CONTINUE | typeof GLib.SOURCE_REMOVE

export class Async {
	static readonly CONTINUE: AsyncResult = GLib.SOURCE_CONTINUE
	static readonly BREAK: AsyncResult = GLib.SOURCE_REMOVE

	static run(to_run: () => AsyncResult, when_done = (): void => { }): void {
		GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
			const response = to_run()
			if (response === Async.CONTINUE) {
				return Async.CONTINUE
			}

			when_done()
			return Async.BREAK
		})
	}

	static run_pipe(tasks: (() => AsyncResult)[], when_done = (): void => { }): void {
		if (tasks.length < 1) {
			when_done()
			return
		}

		const [first_task, ...rest] = tasks

		Async.run(
			first_task!,
			() => Async.run_pipe(rest, when_done),
		)
	}

	static timeout_ms(duration: number, callback = (): void => { }): void {
		GLib.timeout_add(GLib.PRIORITY_DEFAULT, duration, () => {
			callback()
			return Async.BREAK
		})
	}
}
