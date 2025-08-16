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
