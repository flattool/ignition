/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />
/// <reference path="./gudev-1.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://Manette?version=0.2' {
    // Module dependencies
    import type Gio from 'gi://Gio?version=2.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GLib from 'gi://GLib?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';
    import type GUdev from 'gi://GUdev?version=1.0';

    export namespace Manette {
        /**
         * Manette-0.2
         */

        /**
         * Describes available types of a [class`Device]`.
         *
         * More values may be added to this enumeration over time.
         */

        /**
         * Describes available types of a [class`Device]`.
         *
         * More values may be added to this enumeration over time.
         */
        export namespace DeviceType {
            export const $gtype: GObject.GType<DeviceType>;
        }

        enum DeviceType {
            /**
             * Generic gamepads
             */
            GENERIC,
            /**
             * Steam Deck
             */
            STEAM_DECK,
        }
        /**
         * Specifies the type of the event.
         */

        /**
         * Specifies the type of the event.
         */
        export namespace EventType {
            export const $gtype: GObject.GType<EventType>;
        }

        enum EventType {
            /**
             * a special code to indicate a null event
             */
            EVENT_NOTHING,
            /**
             * a button has been pressed
             */
            EVENT_BUTTON_PRESS,
            /**
             * a button has been released
             */
            EVENT_BUTTON_RELEASE,
            /**
             * an absolute axis has been moved
             */
            EVENT_ABSOLUTE,
            /**
             * a hat axis has been moved
             */
            EVENT_HAT,
        }
        /**
         * libmanette major version component (e.g. 1 if the version is 1.2.3).
         */
        const MAJOR_VERSION: number;
        /**
         * libmanette micro version component (e.g. 3 if the version is 1.2.3).
         */
        const MICRO_VERSION: number;
        /**
         * libmanette minor version component (e.g. 2 if the version is 1.2.3).
         */
        const MINOR_VERSION: number;
        /**
         * libmanette version, encoded as a string, useful for printing and
         * concatenation.
         */
        const VERSION_S: string;
        /**
         * Returns the major version number of the libmanette library.
         *
         * For example, in libmanette version 1.2.3 this is 1.
         *
         * This function is in the library, so it represents the libmanette library your
         * code is running against. Contrast with the [const`MAJOR_VERSION]` constant,
         * which represents the major version of the libmanette headers you have
         * included when compiling your code.
         * @returns the major version number of the libmanette library
         */
        function get_major_version(): number;
        /**
         * Returns the micro version number of the libmanette library.
         *
         * For example, in libmanette version 1.2.3 this is 3.
         *
         * This function is in the library, so it represents the libmanette library your
         * code is running against. Contrast with the [const`MAJOR_VERSION]` constant,
         * which represents the micro version of the libmanette headers you have
         * included when compiling your code.
         * @returns the micro version number of the libmanette library
         */
        function get_micro_version(): number;
        /**
         * Returns the minor version number of the libmanette library.
         *
         * For example, in libmanette version 1.2.3 this is 2.
         *
         * This function is in the library, so it represents the libmanette library your
         * code is running against. Contrast with the [const`MAJOR_VERSION]` constant,
         * which represents the minor version of the libmanette headers you have
         * included when compiling your code.
         * @returns the minor version number of the libmanette library
         */
        function get_minor_version(): number;
        function get_resource(): Gio.Resource;
        namespace Device {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'absolute-axis-event': (arg0: Event) => void;
                'button-press-event': (arg0: Event) => void;
                'button-release-event': (arg0: Event) => void;
                disconnected: () => void;
                event: (arg0: Event) => void;
                'hat-axis-event': (arg0: Event) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        /**
         * An object representing a physical gamepad.
         *
         * See also: [class`Monitor]`.
         */
        class Device extends GObject.Object {
            static $gtype: GObject.GType<Device>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Device.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Device.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof Device.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Device.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Device.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Device.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Device.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Device.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            /**
             * Gets the device type of `self`.
             * @returns the device type
             */
            get_device_type(): DeviceType;
            /**
             * Gets the identifier used by SDL mappings to discriminate game controller
             * devices.
             * @returns the identifier used by SDL mappings
             */
            get_guid(): string;
            /**
             * Gets the user mapping for `self,` or default mapping if there isn't any.
             *
             * Can return `NULL` if there's no mapping or `self` doesn't support mappings.
             * @returns the mapping for @self
             */
            get_mapping(): string | null;
            /**
             * Gets the device's name.
             * @returns the name of @self
             */
            get_name(): string;
            /**
             * Gets whether the device has the given input.
             *
             * If the input is present, it means that the device can send events for it
             * regardless of whether the device is mapped or not.
             * @param type the input type
             * @param code the input code
             * @returns whether the device has the given input
             */
            has_input(type: number, code: number): boolean;
            /**
             * Gets whether `self` supports rumble.
             * @returns whether @self supports rumble
             */
            has_rumble(): boolean;
            /**
             * Gets whether `self` has a user mapping.
             * @returns whether @self has a user mapping
             */
            has_user_mapping(): boolean;
            /**
             * Removes the user mapping for `self`.
             */
            remove_user_mapping(): void;
            /**
             * Make `self` rumble during `milliseconds` milliseconds.
             *
             * The heavy and light motors will rumble at their respectively defined
             * magnitudes.
             *
             * The duration cannot exceed 32767 milliseconds.
             * @param strong_magnitude the magnitude for the heavy motor
             * @param weak_magnitude the magnitude for the light motor
             * @param milliseconds the rumble effect play time in milliseconds
             * @returns whether the rumble effect was played
             */
            rumble(strong_magnitude: number, weak_magnitude: number, milliseconds: number): boolean;
            /**
             * Saves `mapping_string` as the user mapping for `self`.
             * @param mapping_string the mapping string
             */
            save_user_mapping(mapping_string: string): void;
            /**
             * Gets whether `self` supports mapping.
             * @returns whether @self supports mapping
             */
            supports_mapping(): boolean;
        }

        namespace Monitor {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'device-connected': (arg0: Device) => void;
                'device-disconnected': (arg0: Device) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        /**
         * An object monitoring the availability of devices.
         *
         * See also: [class`Device]`.
         */
        class Monitor extends GObject.Object {
            static $gtype: GObject.GType<Monitor>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Monitor.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Monitor.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Monitor;

            // Signals

            connect<K extends keyof Monitor.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Monitor.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Monitor.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Monitor.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Monitor.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Monitor.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            /**
             * Creates a new `ManetterMonitorIter` iterating on `self`.
             * @returns a new iterator for @self
             */
            iterate(): MonitorIter;
        }

        type DeviceClass = typeof Device;
        type MonitorClass = typeof Monitor;
        /**
         * An object iterating over the available devices in [class`Monitor]`.
         */
        abstract class MonitorIter {
            static $gtype: GObject.GType<MonitorIter>;

            // Constructors

            _init(...args: any[]): void;

            // Methods

            /**
             * Gets the next device from `self`.
             * @returns whether the next device was retrieved, if not, the end was reached
             */
            next(): [boolean, Device | null];
        }

        /**
         * An event emitted by a [class`Device]`.
         */
        class Event {
            static $gtype: GObject.GType<Event>;

            // Constructors

            _init(...args: any[]): void;

            // Methods

            /**
             * Gets the axis of `self,` if any.
             * @returns whether the axis was retrieved
             */
            get_absolute(): [boolean, number, number];
            /**
             * Gets the button of `self,` if any.
             * @returns whether the button was retrieved
             */
            get_button(): [boolean, number];
            /**
             * Gets the [class`Device]` associated with the `self`.
             * @returns the device associated with the @self
             */
            get_device(): Device;
            /**
             * Gets the event type of `self`.
             * @returns the event type of @self
             */
            get_event_type(): EventType;
            /**
             * Gets the hardware code of `self`.
             * @returns the hardware code of @self
             */
            get_hardware_code(): number;
            /**
             * Gets the hardware index of `self`.
             * @returns the hardware index of @self
             */
            get_hardware_index(): number;
            /**
             * Gets the hardware type of `self`.
             * @returns the hardware type of @self
             */
            get_hardware_type(): number;
            /**
             * Gets the hardware value of `self`.
             * @returns the hardware value of @self
             */
            get_hardware_value(): number;
            /**
             * Gets the hat of `self,` if any.
             * @returns whether the hat was retrieved
             */
            get_hat(): [boolean, number, number];
            /**
             * Gets the timestamp of when `self` was received by the input driver that takes
             * care of its device.
             *
             * Use this timestamp to ensure external factors such as synchronous disk writes
             * don't influence your timing computations.
             * @returns the timestamp of when @self was received by the input driver
             */
            get_time(): number;
        }

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

    export default Manette;
}

declare module 'gi://Manette' {
    import Manette02 from 'gi://Manette?version=0.2';
    export default Manette02;
}
// END
