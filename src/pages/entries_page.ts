import Adw from "gi://Adw?version=1"

import { GObjectify } from "../utils/gobjectify.js"
import "../gtk/loading_group.js"

@GObjectify.Class({ template: "/io/github/flattool/Ignition/pages/entries_page" })
export class EntriesPage extends Adw.NavigationPage {}
