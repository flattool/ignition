/// <reference path="./vulkan-1.0.d.ts" />
/// <reference path="./gstvulkan-1.0.d.ts" />
/// <reference path="./gstvideo-1.0.d.ts" />
/// <reference path="./gstbase-1.0.d.ts" />
/// <reference path="./gst-1.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://GstVulkanWayland?version=1.0' {
    // Module dependencies
    import type Vulkan from 'gi://Vulkan?version=1.0';
    import type GstVulkan from 'gi://GstVulkan?version=1.0';
    import type GstVideo from 'gi://GstVideo?version=1.0';
    import type GstBase from 'gi://GstBase?version=1.0';
    import type Gst from 'gi://Gst?version=1.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GLib from 'gi://GLib?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';

    export namespace GstVulkanWayland {
        /**
         * GstVulkanWayland-1.0
         */

        namespace VulkanDisplayWayland {
            // Signal signatures
            interface SignalSignatures extends GstVulkan.VulkanDisplay.SignalSignatures {
                'notify::name': (pspec: GObject.ParamSpec) => void;
                'notify::parent': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GstVulkan.VulkanDisplay.ConstructorProps {}
        }

        /**
         * the contents of a #GstVulkanDisplayWayland are private and should only be accessed
         * through the provided API
         */
        class VulkanDisplayWayland extends GstVulkan.VulkanDisplay {
            static $gtype: GObject.GType<VulkanDisplayWayland>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: VulkanDisplayWayland.SignalSignatures;

            // Fields

            display: any;
            registry: any;
            compositor: any;
            subcompositor: any;
            shell: any;

            // Constructors

            constructor(properties?: Partial<VulkanDisplayWayland.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](name?: string | null): VulkanDisplayWayland;
            // Conflicted with GstVulkan.VulkanDisplay.new

            static ['new'](...args: never[]): any;

            static new_with_display(display?: any | null): VulkanDisplayWayland;

            // Signals

            connect<K extends keyof VulkanDisplayWayland.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, VulkanDisplayWayland.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof VulkanDisplayWayland.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, VulkanDisplayWayland.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof VulkanDisplayWayland.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<VulkanDisplayWayland.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;
        }

        type VulkanDisplayWaylandClass = typeof VulkanDisplayWayland;
        /**
         * Name of the imported GIR library
         * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L188
         */
        const __name__: string;
        /**
         * Version of the imported GIR library
         * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L189
         */
        const __version__: string;
    }

    export default GstVulkanWayland;
}

declare module 'gi://GstVulkanWayland' {
    import GstVulkanWayland10 from 'gi://GstVulkanWayland?version=1.0';
    export default GstVulkanWayland10;
}
// END
