declare function _(id: string): string

declare const pkg: {
	app_id: string
	datadir: string
	libdir: string
	localedir: string
	moduledir: string
	name: string
	pkgdatadir: string
	prefix: string
	profile: "default" | "development"
	version: string
	package_version: string
}

declare interface String {
	format(...replacements: string[]): string
	format(...replacements: number[]): string
}

type Callable<Args extends any[], Rtrn extends any, This extends any = void> = (this: This, ...args: Args)=> Rtrn

type Class<T = any, Args extends any[] = []> = abstract new (...args: Args)=> T

type ConstructableClass<T = any, Args extends any[] = []> = new (...args: Args)=> T
