import GLib from "gi://GLib?version=2.0"
import GObject from "gi://GObject?version=2.0"
import Gio from "gi://Gio?version=2.0"
import Gtk from "gi://Gtk?version=4.0"

import { PropertyHelpers, type AllPropertyTypes, type PropertyConfigFor } from "./property_helpers.js"

type AtleaseOneOf<T> = (T extends any
	? { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>> }[keyof T]
	: never
)

type DissAllowConstantInFlags<T> = (T extends { flags?: infer F }
	? F extends string
		? "CONSTANT" extends F
			? never
			: T
		: T
	: T
)

type GClass<T extends GObject.Object> = (new (...args: any[])=> T) & { $gtype: GObject.GType }

type Spec = {
	name: string,
	spec: GObject.ParamSpec,
}

type Signal = {
	flags?: GObject.SignalFlags,
	param_types?: GObject.GType[],
	return_type?: GObject.GType,
	accumulator?: GObject.AccumulatorType,
}

type SimpleAction = Omit<Partial<Gio.SimpleAction.ConstructorProps>, "name">

type ClassDecoratorParams<T extends GObject.Object> = AtleaseOneOf<{
	template?: string,
	implements?: { $gtype: GObject.GType }[],
	css_name?: string,
	gtype_flags?: GObject.TypeFlags,
	manual_gtype_name?: string,
	manual_properties?: Record<string, GObject.ParamSpec>,
	manual_internal_children?: string[],
	ready: (this: T)=> (void | Promise<void>),
}>

const signals_map = new WeakMap<Function, Record<string, Signal>>()
const property_map = new WeakMap<GObject.Object, Record<string, any>>()

const CHILD_SYMBOL = Symbol("GObjectify_Decorators_Child")
const PROP_SYMBOL = Symbol("GObjectify_Property")
const ACTION_GROUP_SYMBOL = Symbol("GObjectify_Action_Group_Symbol")

export class GObjectify {
	public static Child<T extends GObject.Object, U extends GObject.Object>(
		_target: ClassAccessorDecoratorTarget<T, U>,
		context: ClassAccessorDecoratorContext<T, U>,
	): ClassAccessorDecoratorResult<T, U> {
		const field_name = String(context.name)
		const gjs_name = `_${field_name}`
		const get = function (this: T): U {
			return (this as any)[gjs_name]
		}
		const set = function (this: T, _value: U): void {
			throw new Error("Cannot write to internal children!")
		}
		;(get as any)[CHILD_SYMBOL] = field_name
		return { get, set }
	}

	public static Property<T extends GObject.Object, U extends AllPropertyTypes, V>(
		prop_type: U,
		config?: AtleaseOneOf<PropertyConfigFor<U> & {
			effect?: (this: T, val: V)=> void,
			every_set_notifies?: boolean,
		}>,
	) {
		return (
			_target: ClassAccessorDecoratorTarget<T, V>,
			context: ClassAccessorDecoratorContext<T, V>,
		): ClassAccessorDecoratorResult<T, V> => {
			const field_name = String(context.name)
			const canonical_name = field_name.replaceAll("_", "-")
			const spec = PropertyHelpers.resolve(field_name, prop_type, config as PropertyConfigFor<U>)
			const set = function (this: T, value: V): void {
				if (config?.flags === "CONSTANT") {
					throw new Error(
						`[GObjectify]: Cannot write to CONSTANT property: '${field_name}' | for object: '${this}'`,
					)
				}
				let props = property_map.get(this)
				if (!props) {
					props = {}
					property_map.set(this, props)
				}
				const old_value = props[field_name]
				props[field_name] = value
				if (config?.every_set_notifies || old_value !== value) {
					this.emit(`notify::${canonical_name}`, spec)
				}
				config?.effect?.call(this, value)
			}
			const get = function (this: T): V {
				const my_props = property_map.get(this)
				if (my_props) {
					return (my_props[field_name] ?? spec.get_default_value() ?? null) as V
				}
				return (spec.get_default_value() ?? null) as V
			}
			;(get as any)[PROP_SYMBOL] = {
				name: field_name,
				spec,
			} satisfies Spec
			return { set, get }
		}
	}

	public static CustomProp<T extends GObject.Object, U extends AllPropertyTypes, V>(
		prop_type: U,
		config?: AtleaseOneOf<
			DissAllowConstantInFlags<PropertyConfigFor<U>> & { initializable_backing_field?: string }
		>,
	) {
		const backing_field: string | undefined = (config && "initializable_backing_field" in config
			? config.initializable_backing_field
			: undefined
		)
		return (target: (this: T)=> V, context: ClassGetterDecoratorContext<T, V>): (()=> V) => {
			const field_name = String(context.name)
			const spec = PropertyHelpers.resolve(field_name, prop_type, config as PropertyConfigFor<U>)
			const get = function (this: T): V {
				return (target.call(this) ?? spec.get_default_value() ?? null) as V
			}
			;(get as any)[PROP_SYMBOL] = {
				name: field_name,
				spec,
			} satisfies Spec
			if (backing_field) {
				context.addInitializer(function (this: T) {
					if ((this as any)[backing_field] !== undefined) return
					;(this as any)[backing_field] = (spec.get_default_value() ?? null) as V
				})
			}
			return get
		}
	}

	public static SetterNotify<T extends GObject.Object, U>(
		target: (this: T, arg0: U)=> void,
		context: ClassSetterDecoratorContext,
	): (this: T, arg0: U)=> void {
		const field_name = String(context.name)
		const canonical_name = field_name.replaceAll("_", "-")
		return function (this: T, value: U) {
			target.call(this, value)
			this.emit(`notify::${canonical_name}`, null)
		}
	}

	public static SimpleAction<
		T extends Gtk.Widget | Gtk.ApplicationWindow | Gtk.Application,
		U extends (
			| ((this: T)=> any)
			| ((this: T, action: Gio.SimpleAction)=> any)
			| ((this: T, action: Gio.SimpleAction, value: GLib.Variant)=> any)
		),
	>(params?: AtleaseOneOf<SimpleAction & {
		save_to?: string,
		accels?: T extends Gtk.Application ? string[] : never,
	}>) {
		const { save_to, accels, ...config } = params ?? {}
		return (target: U, context: ClassMethodDecoratorContext<T, U>): void => {
			const field_name = String(context.name)
			context.addInitializer(function (this: T) {
				const action = new Gio.SimpleAction({ name: String(context.name), ...config })
				action.connect("activate", target.bind(this))

				const is_widget = this instanceof Gtk.Widget
				const is_window = this instanceof Gtk.ApplicationWindow
				const is_applic = this instanceof Gtk.Application

				if (is_widget) {
					let group: Gio.SimpleActionGroup | undefined = (this as any)[ACTION_GROUP_SYMBOL]
					if (!group) {
						group = new Gio.SimpleActionGroup()
						;(this as any)[ACTION_GROUP_SYMBOL] = group
						this.insert_action_group(this.constructor.name, group)
					}
					group.add_action(action)
				} else if (is_window || is_applic) {
					this.add_action(action)
					if (is_applic && accels) this.set_accels_for_action(`app.${field_name}`, accels)
				}
				if (save_to) {
					Object.defineProperty(this, save_to, {
						value: action,
						writable: false,
						enumerable: true,
						configurable: true,
					})
				}
			})
		}
	}

	public static Debounce<T extends GObject.Object, U extends (this: T, ...args: any[])=> void>(
		milliseconds: number,
		params: { trigger: "leading" | "trailing" | "leading+trailing" } = { trigger: "trailing" },
	) {
		const leading = params.trigger.includes("leading")
		const trailing = params.trigger.includes("trailing")
		return (original_method: U, context: ClassMethodDecoratorContext): U => {
			const timeout_symbol = Symbol(`DebounceDebouncerFor${context.name.toString()}`)
			const last_args_symbol = Symbol(`DebounceDebounceArgsFor${context.name.toString()}`)
			const should_call_trailing_symbol = Symbol(
				`DebounceShouldCallTrailingFor${context.name.toString()}`,
			)
			const debounced = function (this: T, ...args: any[]): void {
				const has_scheduled = (this as any)[timeout_symbol] != null
				if (leading && !has_scheduled) {
					original_method.apply(this, args)
				} else {
					(this as any)[last_args_symbol] = args
					;(this as any)[should_call_trailing_symbol] = true
				}
				if ((this as any)[timeout_symbol]) {
					GLib.source_remove((this as any)[timeout_symbol])
				}
				(this as any)[timeout_symbol] = GLib.timeout_add(
					GLib.PRIORITY_DEFAULT,
					milliseconds,
					() => {
						(this as any)[timeout_symbol] = null
						if (trailing && (this as any)[should_call_trailing_symbol]) {
							original_method.apply(this, (this as any)[last_args_symbol] ?? [])
							;(this as any)[should_call_trailing_symbol] = false
						}
						return GLib.SOURCE_REMOVE
					},
				)
			}
			return debounced as U
		}
	}

	public static Signal<T extends GObject.Object>(name: string, props?: AtleaseOneOf<Signal>) {
		return (target: GClass<T>, _context: ClassDecoratorContext): void => {
			let signals = signals_map.get(target)
			if (!signals) {
				signals = {}
				signals_map.set(target, signals)
			}
			signals[name] = props ?? {}
		}
	}

	public static Class<T extends GObject.Object>(params?: ClassDecoratorParams<T>) {
		return (target: GClass<T>, _context: ClassDecoratorContext): void => {
			const prototype = target.prototype
			const children: string[] = []
			const specs: Record<string, GObject.ParamSpec> = {}
			for (const key of Object.getOwnPropertyNames(prototype)) {
				const descriptor = Object.getOwnPropertyDescriptor(prototype, key)
				const getter = descriptor?.get ?? {}

				const child_ui_name = (getter as any)[CHILD_SYMBOL]
				if (child_ui_name && typeof child_ui_name === "string") children.push(child_ui_name)

				const prop_spec: Spec | undefined = (getter as any)[PROP_SYMBOL]
				if (prop_spec && prop_spec.spec instanceof GObject.ParamSpec) {
					specs[prop_spec.name] = prop_spec.spec
				}
			}
			children.push(...params?.manual_internal_children ?? [])
			GObject.registerClass({
				...(params?.template && { Template: `resource://${params.template}.ui` }),
				GTypeName: params?.manual_gtype_name || target.name,
				InternalChildren: children,
				Signals: signals_map.get(target) ?? {},
				...(params?.css_name && { CssName: params.css_name }),
				Properties: {
					...specs,
					...(params?.manual_properties && params.manual_properties),
				},
				Implements: params?.implements ?? [],
			}, target)
			signals_map.delete(target)

			const ready = params?.ready
			if (typeof ready !== "function") return
			const original_init = prototype._init
			prototype._init = function (...args: any): any {
				const original_return_val = original_init?.apply(this, args)
				GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
					const on_error = (e: unknown): void => {
						print(`Error in $ready function for ${target.name}`)
						print(e)
					}
					try {
						const return_val = ready.call(this)
						if (return_val instanceof Promise) return_val.catch(on_error)
					} catch (e) {
						on_error(e)
					}
					return GLib.SOURCE_REMOVE
				})
				return original_return_val
			}
		}
	}

	public static async_connect<Args extends unknown[] = []>(
		obj: GObject.Object,
		resolve_signal: string,
		reject_signal?: string,
	): Promise<Args> {
		return new Promise((resolve, reject) => {
			let resolve_id: number | null = null
			let reject_id: number | null = null
			const cleanup = (): void => {
				if (resolve_id !== null) obj.disconnect(resolve_id)
				if (reject_id !== null) obj.disconnect(reject_id)
			}

			resolve_id = obj.connect(resolve_signal, (_obj, ...args: Args) => {
				cleanup()
				resolve(args)
			})

			if (!reject_signal) return
			reject_id = obj.connect(reject_signal, (_obj, ...args: any) => {
				cleanup()
				reject(new Error(`Rejection signal: '${reject_signal}' triggered with args: ${args}`))
			})
		})
	}

	private constructor() {}
}
