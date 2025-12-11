import Adw from "gi://Adw"

import { GClass } from "../gobjectify/gobjectify.js"

@GClass()
export class MainWindow extends Adw.ApplicationWindow {
	readonly _toast_overlay = new Adw.ToastOverlay()
}
