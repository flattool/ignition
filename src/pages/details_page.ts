import Adw from "gi://Adw?version=1"

import { GClass, from } from "../gobjectify/gobjectify.js"

@GClass({ template: "resource:///io/github/flattool/Ignition/pages/details_page.ui" })
export class DetailsPage extends from(Adw.NavigationPage, {}) {}
