import type Gtk from "gi://Gtk?version=4.0"

export function css_switcher<const T extends string>(widget: Gtk.Widget, ...classes: T[]) {
	return (css_class?: T | ""): void => {
		classes.forEach((cls) => widget.remove_css_class(cls))
		if (css_class) widget.add_css_class(css_class)
	}
}
