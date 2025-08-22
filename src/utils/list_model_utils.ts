import type GObject from "gi://GObject?version=2.0"
import Gio from "gi://Gio?version=2.0"

export function make_iterable<T extends GObject.Object>(model: Gio.ListModel<T>): Gio.ListModel<T> & Iterable<T> {
	return Object.assign(model, {
		*[Symbol.iterator](): Generator<T> {
			for (let i = 0; i < model.get_n_items(); i += 1) {
				const item = model.get_item(i)
				if (item !== null) yield item
			}
		},
	})
}
