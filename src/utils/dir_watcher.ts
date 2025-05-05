import { Async } from "./async.js";
import { Signal } from "./signal.js";

import Gio from "gi://Gio?version=2.0";

// This class exists purely because the regular FileMonitor sends many events when
//   a file's contents are changed, instead of just one.
export class DirWatcher {
	monitor;
	rate_limit_ms;
	event = new Signal();
	last_event = 0; // This will become the new Date.now upon event

	constructor(file: Gio.File, rate_limit_ms: number) {
		this.rate_limit_ms = rate_limit_ms;
		this.monitor = file.monitor_directory(Gio.FileMonitorFlags.NONE, null);
		this.monitor.connect("changed", () => this.on_change());
	}

	on_change() {
		const now = Date.now();
		if (now - this.last_event > this.rate_limit_ms) {
			this.last_event = now;
			// This delay exists to allow time for the file system to finish its changes
			Async.timeout_ms(20, () => this.event.emit());
		}
	}
}
