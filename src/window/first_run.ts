import Adw from "gi://Adw?version=1"

import { GObjectify } from "../utils/gobjectify.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/window/first_run" })
@GObjectify.Signal("first-run-next")
export class FirstRun extends Adw.Bin {
	protected _first_run_next(): void {
		this.emit("first-run-next")
	}
}
