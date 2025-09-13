import type Gtk from "gi://Gtk?version=4.0"
import type GObject from "gi://GObject?version=2.0"
import type Gio from "gi://Gio?version=2.0"

import GLib from "gi://GLib"

export function css_switcher<const T extends string>(widget: Gtk.Widget, ...classes: T[]) {
	return (css_class?: T | ""): void => {
		classes.forEach((cls) => widget.remove_css_class(cls))
		if (css_class) widget.add_css_class(css_class)
	}
}

export function dedent(strings: TemplateStringsArray, ...values: any[]): string {
	const full = strings.map((str, index) => str + (index < values.length ? values[index] : "")).join("")
	const lines = full.split("\n")

	while (lines.length && lines[0]?.trim() === "") {
		lines.shift()
	}
	while (lines.length && lines.at(-1)?.trim() === "") {
		lines.pop()
	}

	let mindent = Number.MAX_SAFE_INTEGER
	for (const line of lines) {
		if (line.trim() === "") continue
		const indent = line.search(/\S/)
		if (indent >= 0) mindent = Math.min(mindent, indent)
	}
	if (mindent === Number.MAX_SAFE_INTEGER) mindent = 0

	return lines.map((line) => (line.trim() === "" ? line : line.slice(mindent))).join("\n")
}

export function make_model_iterable<T extends GObject.Object>(
	model: Gio.ListModel<T>,
): Gio.ListModel<T> & Iterable<T> & { forEach(iteration: (item: T)=> void): void } {
	return Object.assign(model, {
		*[Symbol.iterator](): Generator<T> {
			for (let i = 0; i < model.get_n_items(); i += 1) {
				const item = model.get_item(i)
				if (item !== null) yield item
			}
		},
		forEach(iteration: (item: T)=> void): void {
			for (const item of this) {
				iteration(item)
			}
		},
	})
}

export function try_catch<T, U = T>(to_try: Callable<[], T>, on_catch: Callable<[unknown?], U>): T | U {
	try {
		return to_try()
	} catch (e) {
		return on_catch(e)
	}
}

export function lazy_new<T, Args extends any[]>(klass: ConstructableClass<T, Args>, ...args: Args): Callable<[], T> {
	return () => new klass(...args)
}

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
