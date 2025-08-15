import Adw from "gi://Adw?version=1"

import { GObjectify } from "../utils/gobjectify.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/window/main_navigation_stack" })
export class MainNavigationStack extends Adw.Bin {}
