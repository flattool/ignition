declare function _(id: string): string;
declare function print(...args: any[]): void;
declare function log(obj: object, others?: object[]): void;
declare function log(msg: string, substitutions?: any[]): void;

declare const pkg: {
  version: string;
  name: string;
};

declare module console {
  export function error(obj: object, others?: object[]): void;
  export function error(msg: string, substitutions?: any[]): void;
}

declare interface String {
  format(...replacements: string[]): string;
  format(...replacements: number[]): string;
}
declare interface Number {
  toFixed(digits: number): number;
}

declare const TextDecoder: {
	new(encoding?: string, options?: { fatal?: boolean; ignoreBOM?: boolean }): {
		decode(input?: ArrayBuffer | ArrayBufferView, options?: { stream?: boolean }): string;
	};
}
