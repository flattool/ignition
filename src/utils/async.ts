import GLib from "gi://GLib"

export function chunked_idler(chunk_size: number): ()=> Promise<void> {
	if (chunk_size < 1 || chunk_size !== Math.trunc(chunk_size)) {
		throw new Error(
			"Attempted to create a chunked_idler with chunk_size as less than 1, or as a non-whole number."
			+ " Only whole numbers >= 1 are permitted",
		)
	}
	// Start at chunk_size to ensure this will await next_idle() on the first invocation
	let invocations = chunk_size
	return async () => {
		invocations += 1
		if (invocations < chunk_size) return
		invocations = 0
		await next_idle()
	}
}

export async function next_idle(): Promise<void> {
	return new Promise((resolve, _reject) => GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
		resolve()
		return GLib.SOURCE_REMOVE
	}))
}

export async function timeout_ms(duration: number): Promise<void> {
	return new Promise((resolve, _reject) => GLib.timeout_add(GLib.PRIORITY_DEFAULT, duration, () => {
		resolve()
		return GLib.SOURCE_REMOVE
	}))
}
