/// <reference path="./gio-2.0.d.ts" />
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

declare module 'gi://Gee?version=0.8' {
    // Module dependencies
    import type Gio from 'gi://Gio?version=2.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GLib from 'gi://GLib?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';

    export namespace Gee {
        /**
         * Gee-0.8
         */

        class FutureError extends GLib.Error {
            static $gtype: GObject.GType<FutureError>;

            // Static fields

            static ABANDON_PROMISE: number;
            static EXCEPTION: number;

            // Constructors

            constructor(options: { message: string; code: number });
            _init(...args: any[]): void;
        }

        export namespace ConcurrentSetRangeType {
            export const $gtype: GObject.GType<ConcurrentSetRangeType>;
        }

        enum ConcurrentSetRangeType {
            HEAD,
            TAIL,
            BOUNDED,
            EMPTY,
        }

        export namespace HazardPointerPolicy {
            export const $gtype: GObject.GType<HazardPointerPolicy>;
        }

        enum HazardPointerPolicy {
            DEFAULT,
            THREAD_EXIT,
            TRY_FREE,
            FREE,
            TRY_RELEASE,
            RELEASE,
        }

        export namespace HazardPointerReleasePolicy {
            export const $gtype: GObject.GType<HazardPointerReleasePolicy>;
        }

        enum HazardPointerReleasePolicy {
            HELPER_THREAD,
            MAIN_LOOP,
        }

        export namespace TraversableStream {
            export const $gtype: GObject.GType<TraversableStream>;
        }

        enum TraversableStream {
            YIELD,
            CONTINUE,
            END,
            WAIT,
        }
        function functions_get_equal_func_for(t: GObject.GType): [EqualDataFunc, any];
        function functions_get_hash_func_for(t: GObject.GType): [HashDataFunc, any];
        function functions_get_compare_func_for(t: GObject.GType): [GLib.CompareDataFunc, any];
        function hazard_pointer_policy_is_concrete(): boolean;
        function hazard_pointer_policy_is_blocking(): boolean;
        function hazard_pointer_policy_is_safe(): boolean;
        function hazard_pointer_policy_to_concrete(): HazardPointerPolicy;
        function task(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, task: Task): Future;
        function async_task(): globalThis.Promise<void>;
        function async_task(_callback_: Gio.AsyncReadyCallback | null): void;
        function async_task(_callback_?: Gio.AsyncReadyCallback | null): globalThis.Promise<void> | void;
        function async_task_finish(_res_: Gio.AsyncResult): void;
        interface HashDataFunc {
            (t_type: GObject.GType, t_dup_func: GObject.BoxedCopyFunc, v?: any | null): number;
        }
        interface EqualDataFunc {
            (t_type: GObject.GType, t_dup_func: GObject.BoxedCopyFunc, a?: any | null, b?: any | null): boolean;
        }
        interface LazyFunc {
            (g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): any | null;
        }
        interface FoldMapFunc {
            (
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
                k?: any | null,
                v?: any | null,
                a?: any | null,
            ): any | null;
        }
        interface ForallMapFunc {
            (
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
                k?: any | null,
                v?: any | null,
            ): boolean;
        }
        interface Task {
            (g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): any | null;
        }
        interface FoldFunc {
            (
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                g?: any | null,
                a?: any | null,
            ): any | null;
        }
        interface ForallFunc {
            (g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, g?: any | null): boolean;
        }
        interface UnfoldFunc {
            (a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc): Lazy | null;
        }
        interface StreamFunc {
            (
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                state: TraversableStream,
                g: Lazy | null,
            ): TraversableStream;
        }
        interface MapFunc {
            (
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                g?: any | null,
            ): any | null;
        }
        interface Predicate {
            (g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, g?: any | null): boolean;
        }
        interface FlatMapFunc {
            (
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                g?: any | null,
            ): Iterator;
        }
        namespace AbstractBidirList {
            // Signal signatures
            interface SignalSignatures extends AbstractList.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractList.ConstructorProps, BidirList.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                read_only_view: BidirList;
                readOnlyView: BidirList;
            }
        }

        abstract class AbstractBidirList extends AbstractList implements BidirList {
            static $gtype: GObject.GType<AbstractBidirList>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get read_only_view(): BidirList;
            get readOnlyView(): BidirList;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractBidirList.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractBidirList.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractBidirList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractBidirList.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractBidirList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractBidirList.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractBidirList.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractBidirList.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_bidir_list_iterator(): BidirListIterator;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_read_only_view(): BidirList;

            // Methods

            bidir_list_iterator(): BidirListIterator;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_read_only_view(): BidirList;

            // Inherited methods
            list_iterator(): ListIterator;
            get(index: number): any | null;
            set(index: number, item?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            index_of(item?: any | null): number;
            insert(index: number, item?: any | null): void;
            remove_at(index: number): any | null;
            slice(start: number, stop: number): List | null;
            first(): any | null;
            last(): any | null;
            insert_all(index: number, collection: Collection): void;
            sort(compare_func?: GLib.CompareDataFunc | null): void;
            vfunc_list_iterator(): ListIterator;
            vfunc_get(index: number): any | null;
            vfunc_set(index: number, item?: any | null): void;
            vfunc_index_of(item?: any | null): number;
            vfunc_insert(index: number, item?: any | null): void;
            vfunc_remove_at(index: number): any | null;
            vfunc_slice(start: number, stop: number): List | null;
            vfunc_first(): any | null;
            vfunc_last(): any | null;
            vfunc_insert_all(index: number, collection: Collection): void;
            vfunc_sort(compare_func?: GLib.CompareDataFunc | null): void;
        }

        namespace AbstractBidirSortedSet {
            // Signal signatures
            interface SignalSignatures extends AbstractSortedSet.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractSortedSet.ConstructorProps, BidirSortedSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                read_only_view: BidirSortedSet;
                readOnlyView: BidirSortedSet;
            }
        }

        abstract class AbstractBidirSortedSet extends AbstractSortedSet implements BidirSortedSet {
            static $gtype: GObject.GType<AbstractBidirSortedSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get read_only_view(): BidirSortedSet;
            get readOnlyView(): BidirSortedSet;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractBidirSortedSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractBidirSortedSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractBidirSortedSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractBidirSortedSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractBidirSortedSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractBidirSortedSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractBidirSortedSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractBidirSortedSet.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_bidir_iterator(): BidirIterator;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_read_only_view(): BidirSortedSet;

            // Methods

            bidir_iterator(): BidirIterator;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_read_only_view(): BidirSortedSet;

            // Inherited methods
            first(): any | null;
            last(): any | null;
            iterator_at(element?: any | null): Iterator | null;
            lower(element?: any | null): any | null;
            higher(element?: any | null): any | null;
            floor(element?: any | null): any | null;
            ceil(element?: any | null): any | null;
            head_set(before?: any | null): SortedSet;
            tail_set(after?: any | null): SortedSet;
            sub_set(from?: any | null, to?: any | null): SortedSet;
            vfunc_first(): any | null;
            vfunc_last(): any | null;
            vfunc_iterator_at(element?: any | null): Iterator | null;
            vfunc_lower(element?: any | null): any | null;
            vfunc_higher(element?: any | null): any | null;
            vfunc_floor(element?: any | null): any | null;
            vfunc_ceil(element?: any | null): any | null;
            vfunc_head_set(before?: any | null): SortedSet;
            vfunc_tail_set(after?: any | null): SortedSet;
            vfunc_sub_set(from?: any | null, to?: any | null): SortedSet;
        }

        namespace AbstractBidirSortedMap {
            // Signal signatures
            interface SignalSignatures extends AbstractSortedMap.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::ascending-keys': (pspec: GObject.ParamSpec) => void;
                'notify::ascending-entries': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::keys': (pspec: GObject.ParamSpec) => void;
                'notify::values': (pspec: GObject.ParamSpec) => void;
                'notify::entries': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractSortedMap.ConstructorProps, BidirSortedMap.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
                read_only_view: BidirSortedMap | any;
                readOnlyView: BidirSortedMap | any;
            }
        }

        abstract class AbstractBidirSortedMap extends AbstractSortedMap implements BidirSortedMap {
            static $gtype: GObject.GType<AbstractBidirSortedMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;
            // This accessor conflicts with another accessor's type in a parent class or interface.
            get read_only_view(): BidirSortedMap | any;
            // This accessor conflicts with another accessor's type in a parent class or interface.
            get readOnlyView(): BidirSortedMap | any;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractBidirSortedMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractBidirSortedMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractBidirSortedMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractBidirSortedMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractBidirSortedMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractBidirSortedMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractBidirSortedMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractBidirSortedMap.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_bidir_map_iterator(): BidirMapIterator;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_read_only_view(): BidirSortedMap;

            // Methods

            bidir_map_iterator(): BidirMapIterator;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_read_only_view(): BidirSortedMap;

            // Inherited properties
            get ascending_keys(): SortedSet;
            get ascendingKeys(): SortedSet;
            get ascending_entries(): SortedSet;
            get ascendingEntries(): SortedSet;

            // Inherited methods
            head_map(before?: any | null): SortedMap;
            tail_map(after?: any | null): SortedMap;
            sub_map(before?: any | null, after?: any | null): SortedMap;
            get_ascending_keys(): SortedSet;
            get_ascending_entries(): SortedSet;
            vfunc_head_map(before?: any | null): SortedMap;
            vfunc_tail_map(after?: any | null): SortedMap;
            vfunc_sub_map(before?: any | null, after?: any | null): SortedMap;
            vfunc_get_ascending_keys(): SortedSet;
            vfunc_get_ascending_entries(): SortedSet;
        }

        namespace AbstractCollection {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends GObject.Object.ConstructorProps,
                    Traversable.ConstructorProps,
                    Iterable.ConstructorProps,
                    Collection.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                size: number;
                read_only: boolean;
                readOnly: boolean;
                read_only_view: Collection;
                readOnlyView: Collection;
            }
        }

        abstract class AbstractCollection extends GObject.Object implements Traversable, Iterable, Collection {
            static $gtype: GObject.GType<AbstractCollection>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;
            get read_only_view(): Collection;
            get readOnlyView(): Collection;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractCollection.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractCollection.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractCollection.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractCollection.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractCollection.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractCollection.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractCollection.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractCollection.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_contains(item?: any | null): boolean;
            vfunc_add(item?: any | null): boolean;
            vfunc_remove(item?: any | null): boolean;
            vfunc_clear(): void;
            vfunc_iterator(): Iterator;
            vfunc_foreach(f: ForallFunc): boolean;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_size(): number;
            vfunc_get_read_only(): boolean;
            vfunc_get_read_only_view(): Collection;

            // Methods

            contains(item?: any | null): boolean;
            add(item?: any | null): boolean;
            remove(item?: any | null): boolean;
            clear(): void;
            iterator(): Iterator;
            foreach(f: ForallFunc): boolean;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_size(): number;
            get_read_only(): boolean;
            get_read_only_view(): Collection;

            // Inherited methods
            stream(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: StreamFunc): Iterator;
            fold(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FoldFunc, seed?: any | null): any | null;
            map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: MapFunc): Iterator;
            scan(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FoldFunc, seed?: any | null): Iterator;
            filter(pred: Predicate): Iterator;
            chop(offset: number, length: number): Iterator;
            flat_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FlatMapFunc): Iterator;
            tee(forks: number): Iterator[];
            first_match(pred: Predicate): any | null;
            any_match(pred: Predicate): boolean;
            all_match(pred: Predicate): boolean;
            max(compare: GLib.CompareDataFunc): any | null;
            min(compare: GLib.CompareDataFunc): any | null;
            order_by(compare?: GLib.CompareDataFunc | null): Iterator;
            get_element_type(): GObject.GType;
            vfunc_stream(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: StreamFunc): Iterator;
            vfunc_fold(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                f: FoldFunc,
                seed?: any | null,
            ): any | null;
            vfunc_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: MapFunc): Iterator;
            vfunc_scan(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                f: FoldFunc,
                seed?: any | null,
            ): Iterator;
            vfunc_filter(pred: Predicate): Iterator;
            vfunc_chop(offset: number, length: number): Iterator;
            vfunc_flat_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FlatMapFunc): Iterator;
            vfunc_tee(forks: number): Iterator[];
            vfunc_first_match(pred: Predicate): any | null;
            vfunc_any_match(pred: Predicate): boolean;
            vfunc_all_match(pred: Predicate): boolean;
            vfunc_max(compare: GLib.CompareDataFunc): any | null;
            vfunc_min(compare: GLib.CompareDataFunc): any | null;
            vfunc_order_by(compare?: GLib.CompareDataFunc | null): Iterator;
            vfunc_get_element_type(): GObject.GType;
            add_all(collection: Collection): boolean;
            contains_all(collection: Collection): boolean;
            remove_all(collection: Collection): boolean;
            retain_all(collection: Collection): boolean;
            to_array(): any[];
            add_all_array(array: any[]): boolean;
            contains_all_array(array: any[]): boolean;
            remove_all_array(array: any[]): boolean;
            add_all_iterator(iter: Iterator): boolean;
            contains_all_iterator(iter: Iterator): boolean;
            remove_all_iterator(iter: Iterator): boolean;
            get_is_empty(): boolean;
            vfunc_add_all(collection: Collection): boolean;
            vfunc_contains_all(collection: Collection): boolean;
            vfunc_remove_all(collection: Collection): boolean;
            vfunc_retain_all(collection: Collection): boolean;
            vfunc_to_array(): any[];
            vfunc_add_all_array(array: any[]): boolean;
            vfunc_contains_all_array(array: any[]): boolean;
            vfunc_remove_all_array(array: any[]): boolean;
            vfunc_add_all_iterator(iter: Iterator): boolean;
            vfunc_contains_all_iterator(iter: Iterator): boolean;
            vfunc_remove_all_iterator(iter: Iterator): boolean;
            vfunc_get_is_empty(): boolean;
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Sets multiple properties of an object at once. The properties argument should be a dictionary mapping property names to values.
             * @param properties Object containing the properties to set
             */
            set(properties: { [key: string]: any }): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
        }

        namespace AbstractList {
            // Signal signatures
            interface SignalSignatures extends AbstractCollection.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractCollection.ConstructorProps, List.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                read_only_view: List;
                readOnlyView: List;
            }
        }

        abstract class AbstractList extends AbstractCollection implements List {
            static $gtype: GObject.GType<AbstractList>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get read_only_view(): List;
            get readOnlyView(): List;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractList.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractList.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractList.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractList.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractList.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractList.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_list_iterator(): ListIterator;
            vfunc_get(index: number): any | null;
            vfunc_set(index: number, item?: any | null): void;
            vfunc_index_of(item?: any | null): number;
            vfunc_insert(index: number, item?: any | null): void;
            vfunc_remove_at(index: number): any | null;
            vfunc_slice(start: number, stop: number): List | null;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_read_only_view(): List;

            // Methods

            list_iterator(): ListIterator;
            get(index: number): any | null;
            set(index: number, item?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            index_of(item?: any | null): number;
            insert(index: number, item?: any | null): void;
            remove_at(index: number): any | null;
            slice(start: number, stop: number): List | null;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_read_only_view(): List;

            // Inherited properties
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;

            // Inherited methods
            first(): any | null;
            last(): any | null;
            insert_all(index: number, collection: Collection): void;
            sort(compare_func?: GLib.CompareDataFunc | null): void;
            vfunc_first(): any | null;
            vfunc_last(): any | null;
            vfunc_insert_all(index: number, collection: Collection): void;
            vfunc_sort(compare_func?: GLib.CompareDataFunc | null): void;
            contains(item?: any | null): boolean;
            add(item?: any | null): boolean;
            remove(item?: any | null): boolean;
            clear(): void;
            add_all(collection: Collection): boolean;
            contains_all(collection: Collection): boolean;
            remove_all(collection: Collection): boolean;
            retain_all(collection: Collection): boolean;
            to_array(): any[];
            add_all_array(array: any[]): boolean;
            contains_all_array(array: any[]): boolean;
            remove_all_array(array: any[]): boolean;
            add_all_iterator(iter: Iterator): boolean;
            contains_all_iterator(iter: Iterator): boolean;
            remove_all_iterator(iter: Iterator): boolean;
            get_size(): number;
            get_is_empty(): boolean;
            get_read_only(): boolean;
            vfunc_contains(item?: any | null): boolean;
            vfunc_add(item?: any | null): boolean;
            vfunc_remove(item?: any | null): boolean;
            vfunc_clear(): void;
            vfunc_add_all(collection: Collection): boolean;
            vfunc_contains_all(collection: Collection): boolean;
            vfunc_remove_all(collection: Collection): boolean;
            vfunc_retain_all(collection: Collection): boolean;
            vfunc_to_array(): any[];
            vfunc_add_all_array(array: any[]): boolean;
            vfunc_contains_all_array(array: any[]): boolean;
            vfunc_remove_all_array(array: any[]): boolean;
            vfunc_add_all_iterator(iter: Iterator): boolean;
            vfunc_contains_all_iterator(iter: Iterator): boolean;
            vfunc_remove_all_iterator(iter: Iterator): boolean;
            vfunc_get_size(): number;
            vfunc_get_is_empty(): boolean;
            vfunc_get_read_only(): boolean;
            iterator(): Iterator;
            vfunc_iterator(): Iterator;
        }

        namespace AbstractMap {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::keys': (pspec: GObject.ParamSpec) => void;
                'notify::values': (pspec: GObject.ParamSpec) => void;
                'notify::entries': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends GObject.Object.ConstructorProps,
                    Traversable.ConstructorProps,
                    Iterable.ConstructorProps,
                    Map.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
                size: number;
                read_only: boolean;
                readOnly: boolean;
                keys: Set;
                values: Collection;
                entries: Set;
                read_only_view: Map;
                readOnlyView: Map;
            }
        }

        abstract class AbstractMap extends GObject.Object implements Traversable, Iterable, Map {
            static $gtype: GObject.GType<AbstractMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;
            get keys(): Set;
            get values(): Collection;
            get entries(): Set;
            get read_only_view(): Map;
            get readOnlyView(): Map;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractMap.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_has_key(key?: any | null): boolean;
            vfunc_has(key?: any | null, value?: any | null): boolean;
            vfunc_get(key?: any | null): any | null;
            vfunc_set(key?: any | null, value?: any | null): void;
            vfunc_unset(key: any | null): [boolean, any];
            vfunc_map_iterator(): MapIterator;
            vfunc_clear(): void;
            vfunc_foreach(f: ForallFunc): boolean;
            vfunc_stream(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: StreamFunc): Iterator;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_size(): number;
            vfunc_get_read_only(): boolean;
            vfunc_get_keys(): Set;
            vfunc_get_values(): Collection;
            vfunc_get_entries(): Set;
            vfunc_get_read_only_view(): Map;

            // Methods

            has_key(key?: any | null): boolean;
            has(key?: any | null, value?: any | null): boolean;
            get(key?: any | null): any | null;
            set(key?: any | null, value?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            unset(key: any | null): [boolean, any];
            map_iterator(): MapIterator;
            clear(): void;
            foreach(f: ForallFunc): boolean;
            stream(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: StreamFunc): Iterator;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_size(): number;
            get_read_only(): boolean;
            get_keys(): Set;
            get_values(): Collection;
            get_entries(): Set;
            get_read_only_view(): Map;

            // Inherited methods
            fold(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FoldFunc, seed?: any | null): any | null;
            map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: MapFunc): Iterator;
            scan(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FoldFunc, seed?: any | null): Iterator;
            filter(pred: Predicate): Iterator;
            chop(offset: number, length: number): Iterator;
            flat_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FlatMapFunc): Iterator;
            tee(forks: number): Iterator[];
            first_match(pred: Predicate): any | null;
            any_match(pred: Predicate): boolean;
            all_match(pred: Predicate): boolean;
            max(compare: GLib.CompareDataFunc): any | null;
            min(compare: GLib.CompareDataFunc): any | null;
            order_by(compare?: GLib.CompareDataFunc | null): Iterator;
            get_element_type(): GObject.GType;
            vfunc_fold(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                f: FoldFunc,
                seed?: any | null,
            ): any | null;
            vfunc_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: MapFunc): Iterator;
            vfunc_scan(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                f: FoldFunc,
                seed?: any | null,
            ): Iterator;
            vfunc_filter(pred: Predicate): Iterator;
            vfunc_chop(offset: number, length: number): Iterator;
            vfunc_flat_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FlatMapFunc): Iterator;
            vfunc_tee(forks: number): Iterator[];
            vfunc_first_match(pred: Predicate): any | null;
            vfunc_any_match(pred: Predicate): boolean;
            vfunc_all_match(pred: Predicate): boolean;
            vfunc_max(compare: GLib.CompareDataFunc): any | null;
            vfunc_min(compare: GLib.CompareDataFunc): any | null;
            vfunc_order_by(compare?: GLib.CompareDataFunc | null): Iterator;
            vfunc_get_element_type(): GObject.GType;
            iterator(): Iterator;
            vfunc_iterator(): Iterator;
            contains(key?: any | null): boolean;
            remove(key: any | null): [boolean, any];
            set_all(map: Map): void;
            unset_all(map: Map): boolean;
            remove_all(map: Map): boolean;
            has_all(map: Map): boolean;
            contains_all(map: Map): boolean;
            get_is_empty(): boolean;
            get_key_type(): GObject.GType;
            get_value_type(): GObject.GType;
            vfunc_set_all(map: Map): void;
            vfunc_unset_all(map: Map): boolean;
            vfunc_has_all(map: Map): boolean;
            vfunc_get_is_empty(): boolean;
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
        }

        namespace AbstractMultiMap {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps, MultiMap.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
            }
        }

        abstract class AbstractMultiMap extends GObject.Object implements MultiMap {
            static $gtype: GObject.GType<AbstractMultiMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractMultiMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractMultiMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractMultiMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractMultiMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractMultiMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractMultiMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractMultiMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractMultiMap.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_create_value_storage(): Collection;
            vfunc_create_multi_key_set(): MultiSet;
            vfunc_get_value_equal_func(): [EqualDataFunc, any];
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_get_read_only_view(): MultiMap;

            // Methods

            create_value_storage(): Collection;
            create_multi_key_set(): MultiSet;
            get_value_equal_func(): [EqualDataFunc, any];
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            get_read_only_view(): MultiMap;

            // Inherited properties
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;

            // Inherited methods
            get_keys(): Set;
            get_all_keys(): MultiSet;
            get_values(): Collection;
            contains(key?: any | null): boolean;
            get(key?: any | null): Collection;
            set(key?: any | null, value?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            remove(key?: any | null, value?: any | null): boolean;
            remove_all(key?: any | null): boolean;
            clear(): void;
            map_iterator(): MapIterator;
            get_size(): number;
            get_read_only(): boolean;
            get_key_type(): GObject.GType;
            get_value_type(): GObject.GType;
            vfunc_get_keys(): Set;
            vfunc_get_all_keys(): MultiSet;
            vfunc_get_values(): Collection;
            vfunc_contains(key?: any | null): boolean;
            vfunc_get(key?: any | null): Collection;
            vfunc_set(key?: any | null, value?: any | null): void;
            vfunc_remove(key?: any | null, value?: any | null): boolean;
            vfunc_remove_all(key?: any | null): boolean;
            vfunc_clear(): void;
            vfunc_map_iterator(): MapIterator;
            vfunc_get_size(): number;
            vfunc_get_read_only(): boolean;
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
        }

        namespace AbstractMultiSet {
            // Signal signatures
            interface SignalSignatures extends AbstractCollection.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractCollection.ConstructorProps, MultiSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        abstract class AbstractMultiSet extends AbstractCollection implements MultiSet {
            static $gtype: GObject.GType<AbstractMultiSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractMultiSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractMultiSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractMultiSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractMultiSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractMultiSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractMultiSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractMultiSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractMultiSet.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_get_read_only_view(): MultiSet;

            // Methods

            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            get_read_only_view(): MultiSet;

            // Inherited properties
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;
            get read_only_view(): Collection;
            get readOnlyView(): Collection;

            // Inherited methods
            count(item?: any | null): number;
            vfunc_count(item?: any | null): number;
            contains(item?: any | null): boolean;
            add(item?: any | null): boolean;
            remove(item?: any | null): boolean;
            clear(): void;
            add_all(collection: Collection): boolean;
            contains_all(collection: Collection): boolean;
            remove_all(collection: Collection): boolean;
            retain_all(collection: Collection): boolean;
            to_array(): any[];
            add_all_array(array: any[]): boolean;
            contains_all_array(array: any[]): boolean;
            remove_all_array(array: any[]): boolean;
            add_all_iterator(iter: Iterator): boolean;
            contains_all_iterator(iter: Iterator): boolean;
            remove_all_iterator(iter: Iterator): boolean;
            get_size(): number;
            get_is_empty(): boolean;
            get_read_only(): boolean;
            vfunc_contains(item?: any | null): boolean;
            vfunc_add(item?: any | null): boolean;
            vfunc_remove(item?: any | null): boolean;
            vfunc_clear(): void;
            vfunc_add_all(collection: Collection): boolean;
            vfunc_contains_all(collection: Collection): boolean;
            vfunc_remove_all(collection: Collection): boolean;
            vfunc_retain_all(collection: Collection): boolean;
            vfunc_to_array(): any[];
            vfunc_add_all_array(array: any[]): boolean;
            vfunc_contains_all_array(array: any[]): boolean;
            vfunc_remove_all_array(array: any[]): boolean;
            vfunc_add_all_iterator(iter: Iterator): boolean;
            vfunc_contains_all_iterator(iter: Iterator): boolean;
            vfunc_remove_all_iterator(iter: Iterator): boolean;
            vfunc_get_size(): number;
            vfunc_get_is_empty(): boolean;
            vfunc_get_read_only(): boolean;
            iterator(): Iterator;
            vfunc_iterator(): Iterator;
        }

        namespace AbstractQueue {
            // Signal signatures
            interface SignalSignatures extends AbstractCollection.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::capacity': (pspec: GObject.ParamSpec) => void;
                'notify::remaining-capacity': (pspec: GObject.ParamSpec) => void;
                'notify::is-full': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractCollection.ConstructorProps, Queue.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                capacity: number;
                remaining_capacity: number;
                remainingCapacity: number;
                is_full: boolean;
                isFull: boolean;
            }
        }

        abstract class AbstractQueue extends AbstractCollection implements Queue {
            static $gtype: GObject.GType<AbstractQueue>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get capacity(): number;
            get remaining_capacity(): number;
            get remainingCapacity(): number;
            get is_full(): boolean;
            get isFull(): boolean;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractQueue.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractQueue.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractQueue.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractQueue.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractQueue.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractQueue.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractQueue.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractQueue.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_peek(): any | null;
            vfunc_poll(): any | null;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_capacity(): number;
            vfunc_get_remaining_capacity(): number;
            vfunc_get_is_full(): boolean;

            // Methods

            peek(): any | null;
            poll(): any | null;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_capacity(): number;
            get_remaining_capacity(): number;
            get_is_full(): boolean;

            // Inherited properties
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;
            get read_only_view(): Collection;
            get readOnlyView(): Collection;

            // Inherited methods
            offer(element?: any | null): boolean;
            drain(recipient: Collection, amount: number): number;
            vfunc_offer(element?: any | null): boolean;
            vfunc_drain(recipient: Collection, amount: number): number;
            contains(item?: any | null): boolean;
            add(item?: any | null): boolean;
            remove(item?: any | null): boolean;
            clear(): void;
            add_all(collection: Collection): boolean;
            contains_all(collection: Collection): boolean;
            remove_all(collection: Collection): boolean;
            retain_all(collection: Collection): boolean;
            to_array(): any[];
            add_all_array(array: any[]): boolean;
            contains_all_array(array: any[]): boolean;
            remove_all_array(array: any[]): boolean;
            add_all_iterator(iter: Iterator): boolean;
            contains_all_iterator(iter: Iterator): boolean;
            remove_all_iterator(iter: Iterator): boolean;
            get_size(): number;
            get_is_empty(): boolean;
            get_read_only(): boolean;
            get_read_only_view(): Collection;
            vfunc_contains(item?: any | null): boolean;
            vfunc_add(item?: any | null): boolean;
            vfunc_remove(item?: any | null): boolean;
            vfunc_clear(): void;
            vfunc_add_all(collection: Collection): boolean;
            vfunc_contains_all(collection: Collection): boolean;
            vfunc_remove_all(collection: Collection): boolean;
            vfunc_retain_all(collection: Collection): boolean;
            vfunc_to_array(): any[];
            vfunc_add_all_array(array: any[]): boolean;
            vfunc_contains_all_array(array: any[]): boolean;
            vfunc_remove_all_array(array: any[]): boolean;
            vfunc_add_all_iterator(iter: Iterator): boolean;
            vfunc_contains_all_iterator(iter: Iterator): boolean;
            vfunc_remove_all_iterator(iter: Iterator): boolean;
            vfunc_get_size(): number;
            vfunc_get_is_empty(): boolean;
            vfunc_get_read_only(): boolean;
            vfunc_get_read_only_view(): Collection;
            iterator(): Iterator;
            vfunc_iterator(): Iterator;
        }

        namespace AbstractSet {
            // Signal signatures
            interface SignalSignatures extends AbstractCollection.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractCollection.ConstructorProps, Set.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                read_only_view: Set;
                readOnlyView: Set;
            }
        }

        abstract class AbstractSet extends AbstractCollection implements Set {
            static $gtype: GObject.GType<AbstractSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get read_only_view(): Set;
            get readOnlyView(): Set;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractSet.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_read_only_view(): Set;

            // Methods

            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_read_only_view(): Set;

            // Inherited properties
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;

            // Inherited methods
            contains(item?: any | null): boolean;
            add(item?: any | null): boolean;
            remove(item?: any | null): boolean;
            clear(): void;
            add_all(collection: Collection): boolean;
            contains_all(collection: Collection): boolean;
            remove_all(collection: Collection): boolean;
            retain_all(collection: Collection): boolean;
            to_array(): any[];
            add_all_array(array: any[]): boolean;
            contains_all_array(array: any[]): boolean;
            remove_all_array(array: any[]): boolean;
            add_all_iterator(iter: Iterator): boolean;
            contains_all_iterator(iter: Iterator): boolean;
            remove_all_iterator(iter: Iterator): boolean;
            get_size(): number;
            get_is_empty(): boolean;
            get_read_only(): boolean;
            vfunc_contains(item?: any | null): boolean;
            vfunc_add(item?: any | null): boolean;
            vfunc_remove(item?: any | null): boolean;
            vfunc_clear(): void;
            vfunc_add_all(collection: Collection): boolean;
            vfunc_contains_all(collection: Collection): boolean;
            vfunc_remove_all(collection: Collection): boolean;
            vfunc_retain_all(collection: Collection): boolean;
            vfunc_to_array(): any[];
            vfunc_add_all_array(array: any[]): boolean;
            vfunc_contains_all_array(array: any[]): boolean;
            vfunc_remove_all_array(array: any[]): boolean;
            vfunc_add_all_iterator(iter: Iterator): boolean;
            vfunc_contains_all_iterator(iter: Iterator): boolean;
            vfunc_remove_all_iterator(iter: Iterator): boolean;
            vfunc_get_size(): number;
            vfunc_get_is_empty(): boolean;
            vfunc_get_read_only(): boolean;
            iterator(): Iterator;
            vfunc_iterator(): Iterator;
        }

        namespace AbstractSortedMap {
            // Signal signatures
            interface SignalSignatures extends AbstractMap.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::ascending-keys': (pspec: GObject.ParamSpec) => void;
                'notify::ascending-entries': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::keys': (pspec: GObject.ParamSpec) => void;
                'notify::values': (pspec: GObject.ParamSpec) => void;
                'notify::entries': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractMap.ConstructorProps, SortedMap.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
                ascending_keys: SortedSet;
                ascendingKeys: SortedSet;
                ascending_entries: SortedSet;
                ascendingEntries: SortedSet;
                readOnlyView: AbstractSortedMap;
                read_only_view: AbstractSortedMap;
            }
        }

        abstract class AbstractSortedMap extends AbstractMap implements SortedMap {
            static $gtype: GObject.GType<AbstractSortedMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;
            get ascending_keys(): SortedSet;
            get ascendingKeys(): SortedSet;
            get ascending_entries(): SortedSet;
            get ascendingEntries(): SortedSet;
            get readOnlyView(): AbstractSortedMap;
            get read_only_view(): AbstractSortedMap;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractSortedMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractSortedMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractSortedMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractSortedMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractSortedMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractSortedMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractSortedMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractSortedMap.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_head_map(before?: any | null): SortedMap;
            vfunc_tail_map(after?: any | null): SortedMap;
            vfunc_sub_map(before?: any | null, after?: any | null): SortedMap;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_ascending_keys(): SortedSet;
            vfunc_get_ascending_entries(): SortedSet;

            // Methods

            head_map(before?: any | null): SortedMap;
            tail_map(after?: any | null): SortedMap;
            sub_map(before?: any | null, after?: any | null): SortedMap;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_ascending_keys(): SortedSet;
            get_ascending_entries(): SortedSet;

            // Inherited properties
            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;
            get keys(): Set;
            get values(): Collection;
            get entries(): Set;

            // Inherited methods
            get_read_only_view(): SortedMap;
            vfunc_get_read_only_view(): SortedMap;
            has_key(key?: any | null): boolean;
            contains(key?: any | null): boolean;
            has(key?: any | null, value?: any | null): boolean;
            get(key?: any | null): any | null;
            set(key?: any | null, value?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            unset(key: any | null): [boolean, any];
            remove(key: any | null): [boolean, any];
            clear(): void;
            map_iterator(): MapIterator;
            set_all(map: Map): void;
            unset_all(map: Map): boolean;
            remove_all(map: Map): boolean;
            has_all(map: Map): boolean;
            contains_all(map: Map): boolean;
            get_size(): number;
            get_is_empty(): boolean;
            get_read_only(): boolean;
            get_keys(): Set;
            get_values(): Collection;
            get_entries(): Set;
            get_key_type(): GObject.GType;
            get_value_type(): GObject.GType;
            vfunc_has_key(key?: any | null): boolean;
            vfunc_has(key?: any | null, value?: any | null): boolean;
            vfunc_get(key?: any | null): any | null;
            vfunc_set(key?: any | null, value?: any | null): void;
            vfunc_unset(key: any | null): [boolean, any];
            vfunc_clear(): void;
            vfunc_map_iterator(): MapIterator;
            vfunc_set_all(map: Map): void;
            vfunc_unset_all(map: Map): boolean;
            vfunc_has_all(map: Map): boolean;
            vfunc_get_size(): number;
            vfunc_get_is_empty(): boolean;
            vfunc_get_read_only(): boolean;
            vfunc_get_keys(): Set;
            vfunc_get_values(): Collection;
            vfunc_get_entries(): Set;
        }

        namespace AbstractSortedSet {
            // Signal signatures
            interface SignalSignatures extends AbstractSet.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractSet.ConstructorProps, SortedSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                read_only_view: SortedSet;
                readOnlyView: SortedSet;
            }
        }

        abstract class AbstractSortedSet extends AbstractSet implements SortedSet {
            static $gtype: GObject.GType<AbstractSortedSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get read_only_view(): SortedSet;
            get readOnlyView(): SortedSet;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AbstractSortedSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AbstractSortedSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AbstractSortedSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractSortedSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AbstractSortedSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AbstractSortedSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AbstractSortedSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AbstractSortedSet.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_first(): any | null;
            vfunc_last(): any | null;
            vfunc_iterator_at(element?: any | null): Iterator | null;
            vfunc_lower(element?: any | null): any | null;
            vfunc_higher(element?: any | null): any | null;
            vfunc_floor(element?: any | null): any | null;
            vfunc_ceil(element?: any | null): any | null;
            vfunc_head_set(before?: any | null): SortedSet;
            vfunc_tail_set(after?: any | null): SortedSet;
            vfunc_sub_set(from?: any | null, to?: any | null): SortedSet;
            vfunc_reserved0(): void;
            vfunc_reserved1(): void;
            vfunc_reserved2(): void;
            vfunc_reserved3(): void;
            vfunc_reserved4(): void;
            vfunc_reserved5(): void;
            vfunc_reserved6(): void;
            vfunc_reserved7(): void;
            vfunc_reserved8(): void;
            vfunc_reserved9(): void;
            vfunc_get_read_only_view(): SortedSet;

            // Methods

            first(): any | null;
            last(): any | null;
            iterator_at(element?: any | null): Iterator | null;
            lower(element?: any | null): any | null;
            higher(element?: any | null): any | null;
            floor(element?: any | null): any | null;
            ceil(element?: any | null): any | null;
            head_set(before?: any | null): SortedSet;
            tail_set(after?: any | null): SortedSet;
            sub_set(from?: any | null, to?: any | null): SortedSet;
            reserved0(): void;
            reserved1(): void;
            reserved2(): void;
            reserved3(): void;
            reserved4(): void;
            reserved5(): void;
            reserved6(): void;
            reserved7(): void;
            reserved8(): void;
            reserved9(): void;
            get_read_only_view(): SortedSet;
        }

        namespace ArrayList {
            // Signal signatures
            interface SignalSignatures extends AbstractBidirList.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractBidirList.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        class ArrayList extends AbstractBidirList {
            static $gtype: GObject.GType<ArrayList>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: ArrayList.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<ArrayList.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                equal_func?: EqualDataFunc | null,
            ): ArrayList;

            static wrap(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                items: any[],
                equal_func?: EqualDataFunc | null,
            ): ArrayList;

            // Signals

            connect<K extends keyof ArrayList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ArrayList.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof ArrayList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ArrayList.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof ArrayList.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<ArrayList.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            add_all(collection: Collection): boolean;
            get_equal_func(): [EqualDataFunc, any];
        }

        namespace ArrayQueue {
            // Signal signatures
            interface SignalSignatures extends AbstractQueue.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::is-empty': (pspec: GObject.ParamSpec) => void;
                'notify::capacity': (pspec: GObject.ParamSpec) => void;
                'notify::remaining-capacity': (pspec: GObject.ParamSpec) => void;
                'notify::is-full': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractQueue.ConstructorProps, Deque.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                is_empty: boolean;
                isEmpty: boolean;
            }
        }

        class ArrayQueue extends AbstractQueue implements Deque {
            static $gtype: GObject.GType<ArrayQueue>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get is_empty(): boolean;
            get isEmpty(): boolean;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: ArrayQueue.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<ArrayQueue.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                equal_func?: EqualDataFunc | null,
            ): ArrayQueue;

            // Signals

            connect<K extends keyof ArrayQueue.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ArrayQueue.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof ArrayQueue.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ArrayQueue.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof ArrayQueue.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<ArrayQueue.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_equal_func(): [EqualDataFunc, any];
            get_is_empty(): boolean;

            // Inherited properties
            get capacity(): number;
            get remaining_capacity(): number;
            get remainingCapacity(): number;
            get is_full(): boolean;
            get isFull(): boolean;

            // Inherited methods
            offer_head(element?: any | null): boolean;
            peek_head(): any | null;
            poll_head(): any | null;
            drain_head(recipient: Collection, amount: number): number;
            offer_tail(element?: any | null): boolean;
            peek_tail(): any | null;
            poll_tail(): any | null;
            drain_tail(recipient: Collection, amount: number): number;
            vfunc_offer_head(element?: any | null): boolean;
            vfunc_peek_head(): any | null;
            vfunc_poll_head(): any | null;
            vfunc_drain_head(recipient: Collection, amount: number): number;
            vfunc_offer_tail(element?: any | null): boolean;
            vfunc_peek_tail(): any | null;
            vfunc_poll_tail(): any | null;
            vfunc_drain_tail(recipient: Collection, amount: number): number;
            offer(element?: any | null): boolean;
            peek(): any | null;
            poll(): any | null;
            drain(recipient: Collection, amount: number): number;
            get_capacity(): number;
            get_remaining_capacity(): number;
            get_is_full(): boolean;
            vfunc_offer(element?: any | null): boolean;
            vfunc_peek(): any | null;
            vfunc_poll(): any | null;
            vfunc_drain(recipient: Collection, amount: number): number;
            vfunc_get_capacity(): number;
            vfunc_get_remaining_capacity(): number;
            vfunc_get_is_full(): boolean;
        }

        namespace ConcurrentList {
            // Signal signatures
            interface SignalSignatures extends AbstractList.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::is-empty': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractList.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                is_empty: boolean;
                isEmpty: boolean;
            }
        }

        class ConcurrentList extends AbstractList {
            static $gtype: GObject.GType<ConcurrentList>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get is_empty(): boolean;
            get isEmpty(): boolean;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: ConcurrentList.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<ConcurrentList.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                equal_func?: EqualDataFunc | null,
            ): ConcurrentList;

            // Signals

            connect<K extends keyof ConcurrentList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ConcurrentList.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof ConcurrentList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ConcurrentList.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof ConcurrentList.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<ConcurrentList.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_equal_func(): [EqualDataFunc, any];
            get_is_empty(): boolean;
        }

        namespace ConcurrentSet {
            // Signal signatures
            interface SignalSignatures extends AbstractSortedSet.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractSortedSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        class ConcurrentSet extends AbstractSortedSet {
            static $gtype: GObject.GType<ConcurrentSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: ConcurrentSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<ConcurrentSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                compare_func?: GLib.CompareDataFunc | null,
            ): ConcurrentSet;

            // Signals

            connect<K extends keyof ConcurrentSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ConcurrentSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof ConcurrentSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, ConcurrentSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof ConcurrentSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<ConcurrentSet.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;
        }

        namespace HashMap {
            // Signal signatures
            interface SignalSignatures extends AbstractMap.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::keys': (pspec: GObject.ParamSpec) => void;
                'notify::values': (pspec: GObject.ParamSpec) => void;
                'notify::entries': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractMap.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
            }
        }

        class HashMap extends AbstractMap {
            static $gtype: GObject.GType<HashMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: HashMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<HashMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
                key_hash_func?: HashDataFunc | null,
                key_equal_func?: EqualDataFunc | null,
                value_equal_func?: EqualDataFunc | null,
            ): HashMap;

            // Signals

            connect<K extends keyof HashMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof HashMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof HashMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<HashMap.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_key_hash_func(): [HashDataFunc, any];
            get_key_equal_func(): [EqualDataFunc, any];
            get_value_equal_func(): [EqualDataFunc, any];
        }

        namespace HashMultiMap {
            // Signal signatures
            interface SignalSignatures extends AbstractMultiMap.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractMultiMap.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
            }
        }

        class HashMultiMap extends AbstractMultiMap {
            static $gtype: GObject.GType<HashMultiMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: HashMultiMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<HashMultiMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
                key_hash_func?: HashDataFunc | null,
                key_equal_func?: EqualDataFunc | null,
                value_hash_func?: HashDataFunc | null,
                value_equal_func?: EqualDataFunc | null,
            ): HashMultiMap;

            // Signals

            connect<K extends keyof HashMultiMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashMultiMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof HashMultiMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashMultiMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof HashMultiMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<HashMultiMap.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_key_hash_func(): [HashDataFunc, any];
            get_key_equal_func(): [EqualDataFunc, any];
            get_value_hash_func(): [HashDataFunc, any];
            get_value_equal_func(): [EqualDataFunc, any];
        }

        namespace HashMultiSet {
            // Signal signatures
            interface SignalSignatures extends AbstractMultiSet.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractMultiSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        class HashMultiSet extends AbstractMultiSet {
            static $gtype: GObject.GType<HashMultiSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: HashMultiSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<HashMultiSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                hash_func?: HashDataFunc | null,
                equal_func?: EqualDataFunc | null,
            ): HashMultiSet;

            static broken(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                hash_func?: HashDataFunc | null,
                equal_func?: EqualDataFunc | null,
            ): HashMultiSet;

            // Signals

            connect<K extends keyof HashMultiSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashMultiSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof HashMultiSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashMultiSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof HashMultiSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<HashMultiSet.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_hash_func(): [HashDataFunc, any];
            get_equal_func(): [EqualDataFunc, any];
        }

        namespace HashSet {
            // Signal signatures
            interface SignalSignatures extends AbstractSet.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        class HashSet extends AbstractSet {
            static $gtype: GObject.GType<HashSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: HashSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<HashSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                hash_func?: HashDataFunc | null,
                equal_func?: EqualDataFunc | null,
            ): HashSet;

            // Signals

            connect<K extends keyof HashSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof HashSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, HashSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof HashSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<HashSet.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_hash_func(): [HashDataFunc, any];
            get_equal_func(): [EqualDataFunc, any];
        }

        namespace Lazy {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {}
        }

        class Lazy {
            static $gtype: GObject.GType<Lazy>;

            // Fields

            ref_count: number;

            // Constructors

            _init(...args: any[]): void;

            static ['new'](g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, func: LazyFunc): Lazy;

            static from_value(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, item?: any | null): Lazy;

            // Signals

            connect<K extends keyof Lazy.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Lazy.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Lazy.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Lazy.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Lazy.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Lazy.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            ['eval'](): void;
            get(): any | null;
            get_value(): any | null;
            get_future(): Future | null;
        }

        namespace LinkedList {
            // Signal signatures
            interface SignalSignatures extends AbstractBidirList.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::capacity': (pspec: GObject.ParamSpec) => void;
                'notify::remaining-capacity': (pspec: GObject.ParamSpec) => void;
                'notify::is-full': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends AbstractBidirList.ConstructorProps,
                    Queue.ConstructorProps,
                    Deque.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                readOnlyView: LinkedList;
                read_only_view: LinkedList;
            }
        }

        class LinkedList extends AbstractBidirList implements Queue, Deque {
            static $gtype: GObject.GType<LinkedList>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get readOnlyView(): LinkedList;
            get read_only_view(): LinkedList;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: LinkedList.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<LinkedList.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                equal_func?: EqualDataFunc | null,
            ): LinkedList;

            // Signals

            connect<K extends keyof LinkedList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, LinkedList.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof LinkedList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, LinkedList.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof LinkedList.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<LinkedList.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            first(): any | null;
            last(): any | null;
            get_equal_func(): [EqualDataFunc, any];

            // Inherited properties
            get capacity(): number;
            get remaining_capacity(): number;
            get remainingCapacity(): number;
            get is_full(): boolean;
            get isFull(): boolean;

            // Inherited methods
            offer(element?: any | null): boolean;
            peek(): any | null;
            poll(): any | null;
            drain(recipient: Collection, amount: number): number;
            get_capacity(): number;
            get_remaining_capacity(): number;
            get_is_full(): boolean;
            vfunc_offer(element?: any | null): boolean;
            vfunc_peek(): any | null;
            vfunc_poll(): any | null;
            vfunc_drain(recipient: Collection, amount: number): number;
            vfunc_get_capacity(): number;
            vfunc_get_remaining_capacity(): number;
            vfunc_get_is_full(): boolean;
            offer_head(element?: any | null): boolean;
            peek_head(): any | null;
            poll_head(): any | null;
            drain_head(recipient: Collection, amount: number): number;
            offer_tail(element?: any | null): boolean;
            peek_tail(): any | null;
            poll_tail(): any | null;
            drain_tail(recipient: Collection, amount: number): number;
            vfunc_offer_head(element?: any | null): boolean;
            vfunc_peek_head(): any | null;
            vfunc_poll_head(): any | null;
            vfunc_drain_head(recipient: Collection, amount: number): number;
            vfunc_offer_tail(element?: any | null): boolean;
            vfunc_peek_tail(): any | null;
            vfunc_poll_tail(): any | null;
            vfunc_drain_tail(recipient: Collection, amount: number): number;
        }

        namespace PriorityQueue {
            // Signal signatures
            interface SignalSignatures extends AbstractQueue.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::capacity': (pspec: GObject.ParamSpec) => void;
                'notify::remaining-capacity': (pspec: GObject.ParamSpec) => void;
                'notify::is-full': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractQueue.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        class PriorityQueue extends AbstractQueue {
            static $gtype: GObject.GType<PriorityQueue>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: PriorityQueue.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<PriorityQueue.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                compare_func?: GLib.CompareDataFunc | null,
            ): PriorityQueue;

            // Signals

            connect<K extends keyof PriorityQueue.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, PriorityQueue.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof PriorityQueue.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, PriorityQueue.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof PriorityQueue.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<PriorityQueue.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            offer(element?: any | null): boolean;
            drain(recipient: Collection, amount: number): number;
            get_compare_func(): [GLib.CompareDataFunc, any];
        }

        namespace Promise {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {}
        }

        class Promise {
            static $gtype: GObject.GType<Promise>;

            // Fields

            ref_count: number;

            // Constructors

            _init(...args: any[]): void;

            static ['new'](g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): Promise;

            // Signals

            connect<K extends keyof Promise.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Promise.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Promise.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Promise.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Promise.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Promise.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            set_value(value?: any | null): void;
            set_exception(exception: GLib.Error): void;
            get_future(): Future;
        }

        namespace TreeMap {
            // Signal signatures
            interface SignalSignatures extends AbstractBidirSortedMap.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::ascending-keys': (pspec: GObject.ParamSpec) => void;
                'notify::ascending-entries': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::keys': (pspec: GObject.ParamSpec) => void;
                'notify::values': (pspec: GObject.ParamSpec) => void;
                'notify::entries': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractBidirSortedMap.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
            }
        }

        class TreeMap extends AbstractBidirSortedMap {
            static $gtype: GObject.GType<TreeMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: TreeMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<TreeMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
                key_compare_func?: GLib.CompareDataFunc | null,
                value_equal_func?: EqualDataFunc | null,
            ): TreeMap;

            // Signals

            connect<K extends keyof TreeMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof TreeMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof TreeMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<TreeMap.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_key_compare_func(): [GLib.CompareDataFunc, any];
            get_value_equal_func(): [EqualDataFunc, any];
        }

        namespace TreeMultiMap {
            // Signal signatures
            interface SignalSignatures extends AbstractMultiMap.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractMultiMap.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
            }
        }

        class TreeMultiMap extends AbstractMultiMap {
            static $gtype: GObject.GType<TreeMultiMap>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: TreeMultiMap.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<TreeMultiMap.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
                key_compare_func?: GLib.CompareDataFunc | null,
                value_compare_func?: GLib.CompareDataFunc | null,
            ): TreeMultiMap;

            // Signals

            connect<K extends keyof TreeMultiMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeMultiMap.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof TreeMultiMap.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeMultiMap.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof TreeMultiMap.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<TreeMultiMap.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_key_compare_func(): [GLib.CompareDataFunc, any];
            get_value_compare_func(): [GLib.CompareDataFunc, any];
        }

        namespace TreeMultiSet {
            // Signal signatures
            interface SignalSignatures extends AbstractMultiSet.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractMultiSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        class TreeMultiSet extends AbstractMultiSet {
            static $gtype: GObject.GType<TreeMultiSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: TreeMultiSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<TreeMultiSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                compare_func?: GLib.CompareDataFunc | null,
            ): TreeMultiSet;

            // Signals

            connect<K extends keyof TreeMultiSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeMultiSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof TreeMultiSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeMultiSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof TreeMultiSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<TreeMultiSet.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_compare_func(): [GLib.CompareDataFunc, any];
        }

        namespace TreeSet {
            // Signal signatures
            interface SignalSignatures extends AbstractBidirSortedSet.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends AbstractBidirSortedSet.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
            }
        }

        class TreeSet extends AbstractBidirSortedSet {
            static $gtype: GObject.GType<TreeSet>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: TreeSet.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<TreeSet.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                compare_func?: GLib.CompareDataFunc | null,
            ): TreeSet;

            // Signals

            connect<K extends keyof TreeSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeSet.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof TreeSet.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, TreeSet.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof TreeSet.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<TreeSet.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_compare_func(): [GLib.CompareDataFunc, any];
        }

        namespace UnrolledLinkedList {
            // Signal signatures
            interface SignalSignatures extends AbstractBidirList.SignalSignatures {
                'notify::g-type': (pspec: GObject.ParamSpec) => void;
                'notify::g-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::g-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::read-only-view': (pspec: GObject.ParamSpec) => void;
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
                'notify::capacity': (pspec: GObject.ParamSpec) => void;
                'notify::remaining-capacity': (pspec: GObject.ParamSpec) => void;
                'notify::is-full': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends AbstractBidirList.ConstructorProps,
                    Queue.ConstructorProps,
                    Deque.ConstructorProps {
                g_type: GObject.GType;
                gType: GObject.GType;
                g_dup_func: GObject.BoxedCopyFunc;
                gDupFunc: GObject.BoxedCopyFunc;
                g_destroy_func: GLib.DestroyNotify;
                gDestroyFunc: GLib.DestroyNotify;
                readOnlyView: UnrolledLinkedList;
                read_only_view: UnrolledLinkedList;
            }
        }

        class UnrolledLinkedList extends AbstractBidirList implements Queue, Deque {
            static $gtype: GObject.GType<UnrolledLinkedList>;

            // Properties

            get g_type(): GObject.GType;
            get gType(): GObject.GType;
            get g_dup_func(): GObject.BoxedCopyFunc;
            get gDupFunc(): GObject.BoxedCopyFunc;
            get g_destroy_func(): GLib.DestroyNotify;
            get gDestroyFunc(): GLib.DestroyNotify;
            get readOnlyView(): UnrolledLinkedList;
            get read_only_view(): UnrolledLinkedList;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: UnrolledLinkedList.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<UnrolledLinkedList.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                equal_func?: EqualDataFunc | null,
            ): UnrolledLinkedList;

            // Signals

            connect<K extends keyof UnrolledLinkedList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, UnrolledLinkedList.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof UnrolledLinkedList.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, UnrolledLinkedList.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof UnrolledLinkedList.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<UnrolledLinkedList.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_equal_func(): [EqualDataFunc, any];

            // Inherited properties
            get capacity(): number;
            get remaining_capacity(): number;
            get remainingCapacity(): number;
            get is_full(): boolean;
            get isFull(): boolean;

            // Inherited methods
            offer(element?: any | null): boolean;
            peek(): any | null;
            poll(): any | null;
            drain(recipient: Collection, amount: number): number;
            get_capacity(): number;
            get_remaining_capacity(): number;
            get_is_full(): boolean;
            vfunc_offer(element?: any | null): boolean;
            vfunc_peek(): any | null;
            vfunc_poll(): any | null;
            vfunc_drain(recipient: Collection, amount: number): number;
            vfunc_get_capacity(): number;
            vfunc_get_remaining_capacity(): number;
            vfunc_get_is_full(): boolean;
            offer_head(element?: any | null): boolean;
            peek_head(): any | null;
            poll_head(): any | null;
            drain_head(recipient: Collection, amount: number): number;
            offer_tail(element?: any | null): boolean;
            peek_tail(): any | null;
            poll_tail(): any | null;
            drain_tail(recipient: Collection, amount: number): number;
            vfunc_offer_head(element?: any | null): boolean;
            vfunc_peek_head(): any | null;
            vfunc_poll_head(): any | null;
            vfunc_drain_head(recipient: Collection, amount: number): number;
            vfunc_offer_tail(element?: any | null): boolean;
            vfunc_peek_tail(): any | null;
            vfunc_poll_tail(): any | null;
            vfunc_drain_tail(recipient: Collection, amount: number): number;
        }

        namespace MapEntry {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::k-type': (pspec: GObject.ParamSpec) => void;
                'notify::k-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::k-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-type': (pspec: GObject.ParamSpec) => void;
                'notify::v-dup-func': (pspec: GObject.ParamSpec) => void;
                'notify::v-destroy-func': (pspec: GObject.ParamSpec) => void;
                'notify::key': (pspec: GObject.ParamSpec) => void;
                'notify::value': (pspec: GObject.ParamSpec) => void;
                'notify::read-only': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                k_type: GObject.GType;
                kType: GObject.GType;
                k_dup_func: GObject.BoxedCopyFunc;
                kDupFunc: GObject.BoxedCopyFunc;
                k_destroy_func: GLib.DestroyNotify;
                kDestroyFunc: GLib.DestroyNotify;
                v_type: GObject.GType;
                vType: GObject.GType;
                v_dup_func: GObject.BoxedCopyFunc;
                vDupFunc: GObject.BoxedCopyFunc;
                v_destroy_func: GLib.DestroyNotify;
                vDestroyFunc: GLib.DestroyNotify;
                key: any;
                value: any;
                read_only: boolean;
                readOnly: boolean;
            }
        }

        abstract class MapEntry extends GObject.Object {
            static $gtype: GObject.GType<MapEntry>;

            // Properties

            get k_type(): GObject.GType;
            get kType(): GObject.GType;
            get k_dup_func(): GObject.BoxedCopyFunc;
            get kDupFunc(): GObject.BoxedCopyFunc;
            get k_destroy_func(): GLib.DestroyNotify;
            get kDestroyFunc(): GLib.DestroyNotify;
            get v_type(): GObject.GType;
            get vType(): GObject.GType;
            get v_dup_func(): GObject.BoxedCopyFunc;
            get vDupFunc(): GObject.BoxedCopyFunc;
            get v_destroy_func(): GLib.DestroyNotify;
            get vDestroyFunc(): GLib.DestroyNotify;
            get key(): any;
            get value(): any;
            set value(val: any);
            get read_only(): boolean;
            get readOnly(): boolean;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: MapEntry.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<MapEntry.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof MapEntry.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, MapEntry.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof MapEntry.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, MapEntry.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof MapEntry.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<MapEntry.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_get_key(): any | null;
            vfunc_get_value(): any | null;
            vfunc_set_value(value?: any | null): void;
            vfunc_get_read_only(): boolean;

            // Methods

            get_key(): any | null;
            get_value(): any | null;
            set_value(value?: any | null): void;
            get_read_only(): boolean;
        }

        type AbstractBidirListClass = typeof AbstractBidirList;
        abstract class AbstractBidirListPrivate {
            static $gtype: GObject.GType<AbstractBidirListPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractBidirSortedSetClass = typeof AbstractBidirSortedSet;
        abstract class AbstractBidirSortedSetPrivate {
            static $gtype: GObject.GType<AbstractBidirSortedSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractBidirSortedMapClass = typeof AbstractBidirSortedMap;
        abstract class AbstractBidirSortedMapPrivate {
            static $gtype: GObject.GType<AbstractBidirSortedMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractCollectionClass = typeof AbstractCollection;
        abstract class AbstractCollectionPrivate {
            static $gtype: GObject.GType<AbstractCollectionPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractListClass = typeof AbstractList;
        abstract class AbstractListPrivate {
            static $gtype: GObject.GType<AbstractListPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractMapClass = typeof AbstractMap;
        abstract class AbstractMapPrivate {
            static $gtype: GObject.GType<AbstractMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractMultiMapClass = typeof AbstractMultiMap;
        abstract class AbstractMultiMapPrivate {
            static $gtype: GObject.GType<AbstractMultiMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractMultiSetClass = typeof AbstractMultiSet;
        abstract class AbstractMultiSetPrivate {
            static $gtype: GObject.GType<AbstractMultiSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractQueueClass = typeof AbstractQueue;
        abstract class AbstractQueuePrivate {
            static $gtype: GObject.GType<AbstractQueuePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractSetClass = typeof AbstractSet;
        abstract class AbstractSetPrivate {
            static $gtype: GObject.GType<AbstractSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractSortedMapClass = typeof AbstractSortedMap;
        abstract class AbstractSortedMapPrivate {
            static $gtype: GObject.GType<AbstractSortedMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AbstractSortedSetClass = typeof AbstractSortedSet;
        abstract class AbstractSortedSetPrivate {
            static $gtype: GObject.GType<AbstractSortedSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type ArrayListClass = typeof ArrayList;
        abstract class ArrayListPrivate {
            static $gtype: GObject.GType<ArrayListPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type ArrayQueueClass = typeof ArrayQueue;
        abstract class ArrayQueuePrivate {
            static $gtype: GObject.GType<ArrayQueuePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type ConcurrentListClass = typeof ConcurrentList;
        abstract class ConcurrentListPrivate {
            static $gtype: GObject.GType<ConcurrentListPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type ConcurrentSetClass = typeof ConcurrentSet;
        abstract class ConcurrentSetPrivate {
            static $gtype: GObject.GType<ConcurrentSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type HashMapClass = typeof HashMap;
        abstract class HashMapPrivate {
            static $gtype: GObject.GType<HashMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type HashMultiMapClass = typeof HashMultiMap;
        abstract class HashMultiMapPrivate {
            static $gtype: GObject.GType<HashMultiMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type HashMultiSetClass = typeof HashMultiSet;
        abstract class HashMultiSetPrivate {
            static $gtype: GObject.GType<HashMultiSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type HashSetClass = typeof HashSet;
        abstract class HashSetPrivate {
            static $gtype: GObject.GType<HashSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        class HazardPointer {
            static $gtype: GObject.GType<HazardPointer>;

            // Constructors

            constructor(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, ptr?: any | null);
            _init(...args: any[]): void;

            static ['new'](g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, ptr?: any | null): HazardPointer;

            // Static methods

            static get_hazard_pointer(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                aptr: any | null,
                mask: number,
            ): [HazardPointer | null, number];
            static get_pointer(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                aptr: any | null,
                mask: number,
            ): [any | null, number];
            static exchange_hazard_pointer(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                aptr: any | null,
                new_ptr: any | null,
                mask: number,
                new_mask: number,
            ): [HazardPointer | null, number];
            static set_pointer(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                aptr: any | null,
                new_ptr: any | null,
                mask: number,
                new_mask: number,
            ): void;
            static exchange_pointer(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                aptr: any | null,
                new_ptr: any | null,
                mask: number,
                new_mask: number,
            ): [any | null, number];
            static compare_and_exchange_pointer(
                g_type: GObject.GType,
                g_dup_func: GObject.BoxedCopyFunc,
                aptr: any | null,
                old_ptr: any | null,
                _new_ptr: any | null,
                mask: number,
                old_mask: number,
                new_mask: number,
            ): boolean;
            static set_default_policy(policy: HazardPointerPolicy): void;
            static set_thread_exit_policy(policy: HazardPointerPolicy): void;
            static set_release_policy(policy: HazardPointerReleasePolicy): boolean;

            // Methods

            get(other_thread: boolean): any | null;
            release(): void;
        }

        class HazardPointerContext {
            static $gtype: GObject.GType<HazardPointerContext>;

            // Constructors

            constructor(policy?: HazardPointerPolicy | null);
            _init(...args: any[]): void;

            static ['new'](policy?: HazardPointerPolicy | null): HazardPointerContext;

            // Methods

            try_free(): void;
            free_all(): void;
            try_release(): void;
            release(): void;
        }

        type LazyClass = typeof Lazy;
        abstract class LazyPrivate {
            static $gtype: GObject.GType<LazyPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type LinkedListClass = typeof LinkedList;
        abstract class LinkedListPrivate {
            static $gtype: GObject.GType<LinkedListPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type PriorityQueueClass = typeof PriorityQueue;
        abstract class PriorityQueuePrivate {
            static $gtype: GObject.GType<PriorityQueuePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type PromiseClass = typeof Promise;
        abstract class PromisePrivate {
            static $gtype: GObject.GType<PromisePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type TreeMapClass = typeof TreeMap;
        abstract class TreeMapPrivate {
            static $gtype: GObject.GType<TreeMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type TreeMultiMapClass = typeof TreeMultiMap;
        abstract class TreeMultiMapPrivate {
            static $gtype: GObject.GType<TreeMultiMapPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type TreeMultiSetClass = typeof TreeMultiSet;
        abstract class TreeMultiSetPrivate {
            static $gtype: GObject.GType<TreeMultiSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type TreeSetClass = typeof TreeSet;
        abstract class TreeSetPrivate {
            static $gtype: GObject.GType<TreeSetPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type UnrolledLinkedListClass = typeof UnrolledLinkedList;
        abstract class UnrolledLinkedListPrivate {
            static $gtype: GObject.GType<UnrolledLinkedListPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type BidirIteratorIface = typeof BidirIterator;
        type BidirListIface = typeof BidirList;
        type BidirListIteratorIface = typeof BidirListIterator;
        type BidirMapIteratorIface = typeof BidirMapIterator;
        type BidirSortedSetIface = typeof BidirSortedSet;
        type BidirSortedMapIface = typeof BidirSortedMap;
        type CollectionIface = typeof Collection;
        type ComparableIface = typeof Comparable;
        type DequeIface = typeof Deque;
        type FutureIface = typeof Future;
        type HashableIface = typeof Hashable;
        type IterableIface = typeof Iterable;
        type IteratorIface = typeof Iterator;
        type ListIface = typeof List;
        type ListIteratorIface = typeof ListIterator;
        type MapIface = typeof Map;
        type MapEntryClass = typeof MapEntry;
        abstract class MapEntryPrivate {
            static $gtype: GObject.GType<MapEntryPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type MapIteratorIface = typeof MapIterator;
        type MultiMapIface = typeof MultiMap;
        type MultiSetIface = typeof MultiSet;
        type QueueIface = typeof Queue;
        type SetIface = typeof Set;
        type SortedMapIface = typeof SortedMap;
        type SortedSetIface = typeof SortedSet;
        type TraversableIface = typeof Traversable;
        namespace BidirIterator {
            /**
             * Interface for implementing BidirIterator.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Iterator.Interface {
                // Virtual methods

                vfunc_previous(): boolean;
                vfunc_has_previous(): boolean;
                vfunc_first(): boolean;
                vfunc_last(): boolean;
            }

            // Constructor properties interface

            interface ConstructorProps extends Iterator.ConstructorProps {}
        }

        export interface BidirIteratorNamespace {
            $gtype: GObject.GType<BidirIterator>;
            prototype: BidirIterator;
        }
        interface BidirIterator extends Iterator, BidirIterator.Interface {
            // Methods

            previous(): boolean;
            has_previous(): boolean;
            first(): boolean;
            last(): boolean;
        }

        export const BidirIterator: BidirIteratorNamespace & {
            new (): BidirIterator; // This allows `obj instanceof BidirIterator`
        };

        namespace BidirList {
            /**
             * Interface for implementing BidirList.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends List.Interface {
                // Virtual methods

                vfunc_bidir_list_iterator(): BidirListIterator;
                vfunc_get_read_only_view(): BidirList;
            }

            // Constructor properties interface

            interface ConstructorProps extends List.ConstructorProps {
                read_only_view: BidirList;
                readOnlyView: BidirList;
            }
        }

        export interface BidirListNamespace {
            $gtype: GObject.GType<BidirList>;
            prototype: BidirList;
        }
        interface BidirList extends List {
            // Properties

            get read_only_view(): BidirList;
            get readOnlyView(): BidirList;

            // Methods

            bidir_list_iterator(): BidirListIterator;
            get_read_only_view(): BidirList;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_bidir_list_iterator(): BidirListIterator;
            /** @ignore */
            vfunc_get_read_only_view(): BidirList;
            /** @ignore */
            vfunc_get_read_only_view(): List;
            /** @ignore */
            vfunc_get_read_only_view(): Collection;
        }

        export const BidirList: BidirListNamespace & {
            new (): BidirList; // This allows `obj instanceof BidirList`
        };

        namespace BidirListIterator {
            /**
             * Interface for implementing BidirListIterator.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends BidirIterator.Interface {
                // Virtual methods

                vfunc_insert(item?: any | null): void;
            }

            // Constructor properties interface

            interface ConstructorProps extends BidirIterator.ConstructorProps {}
        }

        export interface BidirListIteratorNamespace {
            $gtype: GObject.GType<BidirListIterator>;
            prototype: BidirListIterator;
        }
        interface BidirListIterator extends BidirIterator, BidirListIterator.Interface {
            // Methods

            insert(item?: any | null): void;
        }

        export const BidirListIterator: BidirListIteratorNamespace & {
            new (): BidirListIterator; // This allows `obj instanceof BidirListIterator`
        };

        namespace BidirMapIterator {
            /**
             * Interface for implementing BidirMapIterator.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends MapIterator.Interface {
                // Virtual methods

                vfunc_previous(): boolean;
                vfunc_has_previous(): boolean;
                vfunc_first(): boolean;
                vfunc_last(): boolean;
            }

            // Constructor properties interface

            interface ConstructorProps extends MapIterator.ConstructorProps {}
        }

        export interface BidirMapIteratorNamespace {
            $gtype: GObject.GType<BidirMapIterator>;
            prototype: BidirMapIterator;
        }
        interface BidirMapIterator extends MapIterator, BidirMapIterator.Interface {
            // Methods

            previous(): boolean;
            has_previous(): boolean;
            first(): boolean;
            last(): boolean;
        }

        export const BidirMapIterator: BidirMapIteratorNamespace & {
            new (): BidirMapIterator; // This allows `obj instanceof BidirMapIterator`
        };

        namespace BidirSortedSet {
            /**
             * Interface for implementing BidirSortedSet.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends SortedSet.Interface {
                // Virtual methods

                vfunc_bidir_iterator(): BidirIterator;
                vfunc_get_read_only_view(): BidirSortedSet;
            }

            // Constructor properties interface

            interface ConstructorProps extends SortedSet.ConstructorProps {
                read_only_view: BidirSortedSet;
                readOnlyView: BidirSortedSet;
            }
        }

        export interface BidirSortedSetNamespace {
            $gtype: GObject.GType<BidirSortedSet>;
            prototype: BidirSortedSet;

            empty(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): BidirSortedSet;
        }
        interface BidirSortedSet extends SortedSet {
            // Properties

            get read_only_view(): BidirSortedSet;
            get readOnlyView(): BidirSortedSet;

            // Methods

            bidir_iterator(): BidirIterator;
            get_read_only_view(): BidirSortedSet;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_bidir_iterator(): BidirIterator;
            /** @ignore */
            vfunc_get_read_only_view(): BidirSortedSet;
            /** @ignore */
            vfunc_get_read_only_view(): SortedSet;
            /** @ignore */
            vfunc_get_read_only_view(): Set;
            /** @ignore */
            vfunc_get_read_only_view(): Collection;
        }

        export const BidirSortedSet: BidirSortedSetNamespace & {
            new (): BidirSortedSet; // This allows `obj instanceof BidirSortedSet`
        };

        namespace BidirSortedMap {
            /**
             * Interface for implementing BidirSortedMap.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends SortedMap.Interface {
                // Virtual methods

                vfunc_bidir_map_iterator(): BidirMapIterator;
                vfunc_get_read_only_view(): BidirSortedMap;
            }

            // Constructor properties interface

            interface ConstructorProps extends SortedMap.ConstructorProps {
                read_only_view: BidirSortedMap;
                readOnlyView: BidirSortedMap;
            }
        }

        export interface BidirSortedMapNamespace {
            $gtype: GObject.GType<BidirSortedMap>;
            prototype: BidirSortedMap;

            empty(
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
            ): BidirSortedMap;
        }
        interface BidirSortedMap extends SortedMap {
            // Properties

            get read_only_view(): BidirSortedMap;
            get readOnlyView(): BidirSortedMap;

            // Methods

            bidir_map_iterator(): BidirMapIterator;
            get_read_only_view(): BidirSortedMap;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_bidir_map_iterator(): BidirMapIterator;
            /** @ignore */
            vfunc_get_read_only_view(): BidirSortedMap;
            /** @ignore */
            vfunc_get_read_only_view(): SortedMap;
            /** @ignore */
            vfunc_get_read_only_view(): Map;
        }

        export const BidirSortedMap: BidirSortedMapNamespace & {
            new (): BidirSortedMap; // This allows `obj instanceof BidirSortedMap`
        };

        namespace Collection {
            /**
             * Interface for implementing Collection.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Iterable.Interface {
                // Virtual methods

                vfunc_contains(item?: any | null): boolean;
                vfunc_add(item?: any | null): boolean;
                vfunc_remove(item?: any | null): boolean;
                vfunc_clear(): void;
                vfunc_add_all(collection: Collection): boolean;
                vfunc_contains_all(collection: Collection): boolean;
                vfunc_remove_all(collection: Collection): boolean;
                vfunc_retain_all(collection: Collection): boolean;
                vfunc_to_array(): any[];
                vfunc_add_all_array(array: any[]): boolean;
                vfunc_contains_all_array(array: any[]): boolean;
                vfunc_remove_all_array(array: any[]): boolean;
                vfunc_add_all_iterator(iter: Iterator): boolean;
                vfunc_contains_all_iterator(iter: Iterator): boolean;
                vfunc_remove_all_iterator(iter: Iterator): boolean;
                vfunc_get_size(): number;
                vfunc_get_is_empty(): boolean;
                vfunc_get_read_only(): boolean;
                vfunc_get_read_only_view(): Collection;
            }

            // Constructor properties interface

            interface ConstructorProps extends Iterable.ConstructorProps {
                size: number;
                read_only: boolean;
                readOnly: boolean;
                read_only_view: Collection;
                readOnlyView: Collection;
            }
        }

        export interface CollectionNamespace {
            $gtype: GObject.GType<Collection>;
            prototype: Collection;

            empty(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): Collection;
        }
        interface Collection extends Iterable, Collection.Interface {
            // Properties

            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;
            get read_only_view(): Collection;
            get readOnlyView(): Collection;

            // Methods

            contains(item?: any | null): boolean;
            add(item?: any | null): boolean;
            remove(item?: any | null): boolean;
            clear(): void;
            add_all(collection: Collection): boolean;
            contains_all(collection: Collection): boolean;
            remove_all(collection: Collection): boolean;
            retain_all(collection: Collection): boolean;
            to_array(): any[];
            add_all_array(array: any[]): boolean;
            contains_all_array(array: any[]): boolean;
            remove_all_array(array: any[]): boolean;
            add_all_iterator(iter: Iterator): boolean;
            contains_all_iterator(iter: Iterator): boolean;
            remove_all_iterator(iter: Iterator): boolean;
            get_size(): number;
            get_is_empty(): boolean;
            get_read_only(): boolean;
            get_read_only_view(): Collection;
        }

        export const Collection: CollectionNamespace & {
            new (): Collection; // This allows `obj instanceof Collection`
        };

        namespace Comparable {
            /**
             * Interface for implementing Comparable.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_compare_to(object?: any | null): number;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        export interface ComparableNamespace {
            $gtype: GObject.GType<Comparable>;
            prototype: Comparable;
        }
        interface Comparable extends GObject.Object, Comparable.Interface {
            // Methods

            compare_to(object?: any | null): number;
        }

        export const Comparable: ComparableNamespace & {
            new (): Comparable; // This allows `obj instanceof Comparable`
        };

        namespace Deque {
            /**
             * Interface for implementing Deque.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Queue.Interface {
                // Virtual methods

                vfunc_offer_head(element?: any | null): boolean;
                vfunc_peek_head(): any | null;
                vfunc_poll_head(): any | null;
                vfunc_drain_head(recipient: Collection, amount: number): number;
                vfunc_offer_tail(element?: any | null): boolean;
                vfunc_peek_tail(): any | null;
                vfunc_poll_tail(): any | null;
                vfunc_drain_tail(recipient: Collection, amount: number): number;
            }

            // Constructor properties interface

            interface ConstructorProps extends Queue.ConstructorProps {}
        }

        export interface DequeNamespace {
            $gtype: GObject.GType<Deque>;
            prototype: Deque;
        }
        interface Deque extends Queue, Deque.Interface {
            // Methods

            offer_head(element?: any | null): boolean;
            peek_head(): any | null;
            poll_head(): any | null;
            drain_head(recipient: Collection, amount: number): number;
            offer_tail(element?: any | null): boolean;
            peek_tail(): any | null;
            poll_tail(): any | null;
            drain_tail(recipient: Collection, amount: number): number;
        }

        export const Deque: DequeNamespace & {
            new (): Deque; // This allows `obj instanceof Deque`
        };

        namespace Future {
            /**
             * Interface for implementing Future.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_wait(): any | null;
                vfunc_wait_until(end_time: number): [boolean, any];
                vfunc_wait_async(_callback_?: Gio.AsyncReadyCallback<this> | null): void;
                vfunc_wait_finish(_res_: Gio.AsyncResult): any | null;
                vfunc_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, func: Future.MapFunc): Future;
                vfunc_light_map(
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    func: Future.LightMapFunc,
                ): Future;
                vfunc_light_map_broken(
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    func: Future.LightMapFunc,
                ): Future;
                vfunc_zip(
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    b_type: GObject.GType,
                    b_dup_func: GObject.BoxedCopyFunc,
                    zip_func: Future.ZipFunc,
                    second: Future,
                ): Future;
                vfunc_flat_map(
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    func: Future.FlatMapFunc,
                ): Future;
                vfunc_get_value(): any | null;
                vfunc_get_ready(): boolean;
                vfunc_get_exception(): GLib.Error | null;
            }

            interface MapFunc {
                (
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    g_type: GObject.GType,
                    g_dup_func: GObject.BoxedCopyFunc,
                    value?: any | null,
                ): any | null;
            }
            interface LightMapFunc {
                (
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    g_type: GObject.GType,
                    g_dup_func: GObject.BoxedCopyFunc,
                    value?: any | null,
                ): any | null;
            }
            interface ZipFunc {
                (
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    b_type: GObject.GType,
                    b_dup_func: GObject.BoxedCopyFunc,
                    c_type: GObject.GType,
                    c_dup_func: GObject.BoxedCopyFunc,
                    a?: any | null,
                    b?: any | null,
                ): any | null;
            }
            interface FlatMapFunc {
                (
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    g_type: GObject.GType,
                    g_dup_func: GObject.BoxedCopyFunc,
                    value?: any | null,
                ): Future;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                ready: boolean;
                exception: GLib.Error;
            }
        }

        export interface FutureNamespace {
            $gtype: GObject.GType<Future>;
            prototype: Future;
        }
        interface Future extends GObject.Object, Future.Interface {
            // Properties

            get ready(): boolean;
            get exception(): GLib.Error;

            // Methods

            wait(): any | null;
            wait_until(end_time: number): [boolean, any];
            wait_async(): globalThis.Promise<any | null>;
            wait_async(_callback_: Gio.AsyncReadyCallback<this> | null): void;
            wait_async(_callback_?: Gio.AsyncReadyCallback<this> | null): globalThis.Promise<any | null> | void;
            wait_finish(_res_: Gio.AsyncResult): any | null;
            map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, func: Future.MapFunc): Future;
            light_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, func: Future.LightMapFunc): Future;
            light_map_broken(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                func: Future.LightMapFunc,
            ): Future;
            zip(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                b_type: GObject.GType,
                b_dup_func: GObject.BoxedCopyFunc,
                zip_func: Future.ZipFunc,
                second: Future,
            ): Future;
            flat_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, func: Future.FlatMapFunc): Future;
            get_value(): any | null;
            get_ready(): boolean;
            get_exception(): GLib.Error | null;
        }

        export const Future: FutureNamespace & {
            new (): Future; // This allows `obj instanceof Future`
        };

        namespace Hashable {
            /**
             * Interface for implementing Hashable.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_hash(): number;
                vfunc_equal_to(object?: any | null): boolean;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        export interface HashableNamespace {
            $gtype: GObject.GType<Hashable>;
            prototype: Hashable;
        }
        interface Hashable extends GObject.Object, Hashable.Interface {
            // Methods

            hash(): number;
            equal_to(object?: any | null): boolean;
        }

        export const Hashable: HashableNamespace & {
            new (): Hashable; // This allows `obj instanceof Hashable`
        };

        namespace Iterable {
            /**
             * Interface for implementing Iterable.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_iterator(): Iterator;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        export interface IterableNamespace {
            $gtype: GObject.GType<Iterable>;
            prototype: Iterable;
        }
        interface Iterable extends GObject.Object, Iterable.Interface {
            // Methods

            iterator(): Iterator;
        }

        export const Iterable: IterableNamespace & {
            new (): Iterable; // This allows `obj instanceof Iterable`
        };

        namespace Iterator {
            /**
             * Interface for implementing Iterator.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_next(): boolean;
                vfunc_has_next(): boolean;
                vfunc_get(): any | null;
                vfunc_remove(): void;
                vfunc_get_valid(): boolean;
                vfunc_get_read_only(): boolean;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                valid: boolean;
                read_only: boolean;
                readOnly: boolean;
            }
        }

        export interface IteratorNamespace {
            $gtype: GObject.GType<Iterator>;
            prototype: Iterator;

            unfold(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                f: UnfoldFunc,
                current?: Lazy | null,
            ): Iterator;
            concat(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc, iters: Iterator): Iterator;
        }
        interface Iterator extends GObject.Object, Iterator.Interface {
            // Properties

            get valid(): boolean;
            get read_only(): boolean;
            get readOnly(): boolean;

            // Methods

            next(): boolean;
            has_next(): boolean;
            get(): any | null;
            remove(): void;
            get_valid(): boolean;
            get_read_only(): boolean;
        }

        export const Iterator: IteratorNamespace & {
            new (): Iterator; // This allows `obj instanceof Iterator`
        };

        namespace List {
            /**
             * Interface for implementing List.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Collection.Interface {
                // Virtual methods

                vfunc_list_iterator(): ListIterator;
                vfunc_get(index: number): any | null;
                vfunc_set(index: number, item?: any | null): void;
                vfunc_index_of(item?: any | null): number;
                vfunc_insert(index: number, item?: any | null): void;
                vfunc_remove_at(index: number): any | null;
                vfunc_slice(start: number, stop: number): List | null;
                vfunc_first(): any | null;
                vfunc_last(): any | null;
                vfunc_insert_all(index: number, collection: Collection): void;
                vfunc_sort(compare_func?: GLib.CompareDataFunc | null): void;
                vfunc_get_read_only_view(): List;
            }

            // Constructor properties interface

            interface ConstructorProps extends Collection.ConstructorProps {
                read_only_view: List;
                readOnlyView: List;
            }
        }

        export interface ListNamespace {
            $gtype: GObject.GType<List>;
            prototype: List;

            empty(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): List;
        }
        interface List extends Collection {
            // Properties

            get read_only_view(): List;
            get readOnlyView(): List;

            // Methods

            list_iterator(): ListIterator;
            get(index: number): any | null;
            set(index: number, item?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            index_of(item?: any | null): number;
            insert(index: number, item?: any | null): void;
            remove_at(index: number): any | null;
            slice(start: number, stop: number): List | null;
            first(): any | null;
            last(): any | null;
            insert_all(index: number, collection: Collection): void;
            sort(compare_func?: GLib.CompareDataFunc | null): void;
            get_read_only_view(): List;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_list_iterator(): ListIterator;
            /** @ignore */
            vfunc_get(index: number): any | null;
            /** @ignore */
            vfunc_set(index: number, item?: any | null): void;
            /** @ignore */
            vfunc_index_of(item?: any | null): number;
            /** @ignore */
            vfunc_insert(index: number, item?: any | null): void;
            /** @ignore */
            vfunc_remove_at(index: number): any | null;
            /** @ignore */
            vfunc_slice(start: number, stop: number): List | null;
            /** @ignore */
            vfunc_first(): any | null;
            /** @ignore */
            vfunc_last(): any | null;
            /** @ignore */
            vfunc_insert_all(index: number, collection: Collection): void;
            /** @ignore */
            vfunc_sort(compare_func?: GLib.CompareDataFunc | null): void;
            /** @ignore */
            vfunc_get_read_only_view(): List;
            /** @ignore */
            vfunc_get_read_only_view(): Collection;
        }

        export const List: ListNamespace & {
            new (): List; // This allows `obj instanceof List`
        };

        namespace ListIterator {
            /**
             * Interface for implementing ListIterator.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Iterator.Interface {
                // Virtual methods

                vfunc_set(item?: any | null): void;
                vfunc_add(item?: any | null): void;
                vfunc_index(): number;
            }

            // Constructor properties interface

            interface ConstructorProps extends Iterator.ConstructorProps {}
        }

        export interface ListIteratorNamespace {
            $gtype: GObject.GType<ListIterator>;
            prototype: ListIterator;
        }
        interface ListIterator extends Iterator, ListIterator.Interface {
            // Methods

            set(item?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            add(item?: any | null): void;
            index(): number;
        }

        export const ListIterator: ListIteratorNamespace & {
            new (): ListIterator; // This allows `obj instanceof ListIterator`
        };

        namespace Map {
            /**
             * Interface for implementing Map.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_has_key(key?: any | null): boolean;
                vfunc_has(key?: any | null, value?: any | null): boolean;
                vfunc_get(key?: any | null): any | null;
                vfunc_set(key?: any | null, value?: any | null): void;
                vfunc_unset(key: any | null): [boolean, any];
                vfunc_clear(): void;
                vfunc_map_iterator(): MapIterator;
                vfunc_set_all(map: Map): void;
                vfunc_unset_all(map: Map): boolean;
                vfunc_has_all(map: Map): boolean;
                vfunc_get_size(): number;
                vfunc_get_is_empty(): boolean;
                vfunc_get_read_only(): boolean;
                vfunc_get_keys(): Set;
                vfunc_get_values(): Collection;
                vfunc_get_entries(): Set;
                vfunc_get_read_only_view(): Map;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                size: number;
                read_only: boolean;
                readOnly: boolean;
                keys: Set;
                values: Collection;
                entries: Set;
                read_only_view: Map;
                readOnlyView: Map;
            }
        }

        export interface MapNamespace {
            $gtype: GObject.GType<Map>;
            prototype: Map;

            empty(
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
            ): Map;
        }
        interface Map extends GObject.Object, Map.Interface {
            // Properties

            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;
            get keys(): Set;
            get values(): Collection;
            get entries(): Set;
            get read_only_view(): Map;
            get readOnlyView(): Map;

            // Methods

            has_key(key?: any | null): boolean;
            contains(key?: any | null): boolean;
            has(key?: any | null, value?: any | null): boolean;
            get(key?: any | null): any | null;
            set(key?: any | null, value?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            unset(key: any | null): [boolean, any];
            remove(key: any | null): [boolean, any];
            clear(): void;
            map_iterator(): MapIterator;
            set_all(map: Map): void;
            unset_all(map: Map): boolean;
            remove_all(map: Map): boolean;
            has_all(map: Map): boolean;
            contains_all(map: Map): boolean;
            get_size(): number;
            get_is_empty(): boolean;
            get_read_only(): boolean;
            get_keys(): Set;
            get_values(): Collection;
            get_entries(): Set;
            get_read_only_view(): Map;
            get_key_type(): GObject.GType;
            get_value_type(): GObject.GType;
        }

        export const Map: MapNamespace & {
            new (): Map; // This allows `obj instanceof Map`
        };

        namespace MapIterator {
            /**
             * Interface for implementing MapIterator.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_next(): boolean;
                vfunc_has_next(): boolean;
                vfunc_get_key(): any | null;
                vfunc_get_value(): any | null;
                vfunc_set_value(value?: any | null): void;
                vfunc_unset(): void;
                vfunc_fold(
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    f: FoldMapFunc,
                    seed?: any | null,
                ): any | null;
                vfunc_foreach(f: ForallMapFunc): boolean;
                vfunc_get_valid(): boolean;
                vfunc_get_mutable(): boolean;
                vfunc_get_read_only(): boolean;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                valid: boolean;
                mutable: boolean;
                read_only: boolean;
                readOnly: boolean;
            }
        }

        export interface MapIteratorNamespace {
            $gtype: GObject.GType<MapIterator>;
            prototype: MapIterator;
        }
        interface MapIterator extends GObject.Object, MapIterator.Interface {
            // Properties

            get valid(): boolean;
            get mutable(): boolean;
            get read_only(): boolean;
            get readOnly(): boolean;

            // Methods

            next(): boolean;
            has_next(): boolean;
            get_key(): any | null;
            get_value(): any | null;
            set_value(value?: any | null): void;
            unset(): void;
            fold(
                a_type: GObject.GType,
                a_dup_func: GObject.BoxedCopyFunc,
                f: FoldMapFunc,
                seed?: any | null,
            ): any | null;
            foreach(f: ForallMapFunc): boolean;
            get_valid(): boolean;
            get_mutable(): boolean;
            get_read_only(): boolean;
        }

        export const MapIterator: MapIteratorNamespace & {
            new (): MapIterator; // This allows `obj instanceof MapIterator`
        };

        namespace MultiMap {
            /**
             * Interface for implementing MultiMap.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_get_keys(): Set;
                vfunc_get_all_keys(): MultiSet;
                vfunc_get_values(): Collection;
                vfunc_contains(key?: any | null): boolean;
                vfunc_get(key?: any | null): Collection;
                vfunc_set(key?: any | null, value?: any | null): void;
                vfunc_remove(key?: any | null, value?: any | null): boolean;
                vfunc_remove_all(key?: any | null): boolean;
                vfunc_clear(): void;
                vfunc_map_iterator(): MapIterator;
                vfunc_get_size(): number;
                vfunc_get_read_only(): boolean;
                vfunc_get_read_only_view(): MultiMap;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                size: number;
                read_only: boolean;
                readOnly: boolean;
            }
        }

        export interface MultiMapNamespace {
            $gtype: GObject.GType<MultiMap>;
            prototype: MultiMap;
        }
        interface MultiMap extends GObject.Object, MultiMap.Interface {
            // Properties

            get size(): number;
            get read_only(): boolean;
            get readOnly(): boolean;

            // Methods

            get_keys(): Set;
            get_all_keys(): MultiSet;
            get_values(): Collection;
            contains(key?: any | null): boolean;
            get(key?: any | null): Collection;
            set(key?: any | null, value?: any | null): void;
            // Conflicted with GObject.Object.set
            set(...args: never[]): any;
            remove(key?: any | null, value?: any | null): boolean;
            remove_all(key?: any | null): boolean;
            clear(): void;
            map_iterator(): MapIterator;
            get_size(): number;
            get_read_only(): boolean;
            get_key_type(): GObject.GType;
            get_value_type(): GObject.GType;
            get_read_only_view(): MultiMap;
        }

        export const MultiMap: MultiMapNamespace & {
            new (): MultiMap; // This allows `obj instanceof MultiMap`
        };

        namespace MultiSet {
            /**
             * Interface for implementing MultiSet.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Collection.Interface {
                // Virtual methods

                vfunc_count(item?: any | null): number;
                vfunc_get_read_only_view(): MultiSet;
            }

            // Constructor properties interface

            interface ConstructorProps extends Collection.ConstructorProps {}
        }

        export interface MultiSetNamespace {
            $gtype: GObject.GType<MultiSet>;
            prototype: MultiSet;

            empty(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): Set;
        }
        interface MultiSet extends Collection {
            // Methods

            count(item?: any | null): number;
            get_read_only_view(): MultiSet;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_count(item?: any | null): number;
            /** @ignore */
            vfunc_get_read_only_view(): MultiSet;
            /** @ignore */
            vfunc_get_read_only_view(): Collection;
        }

        export const MultiSet: MultiSetNamespace & {
            new (): MultiSet; // This allows `obj instanceof MultiSet`
        };

        namespace Queue {
            /**
             * Interface for implementing Queue.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Collection.Interface {
                // Virtual methods

                vfunc_offer(element?: any | null): boolean;
                vfunc_peek(): any | null;
                vfunc_poll(): any | null;
                vfunc_drain(recipient: Collection, amount: number): number;
                vfunc_get_capacity(): number;
                vfunc_get_remaining_capacity(): number;
                vfunc_get_is_full(): boolean;
            }

            // Constructor properties interface

            interface ConstructorProps extends Collection.ConstructorProps {
                capacity: number;
                remaining_capacity: number;
                remainingCapacity: number;
                is_full: boolean;
                isFull: boolean;
            }
        }

        export interface QueueNamespace {
            $gtype: GObject.GType<Queue>;
            prototype: Queue;
        }
        interface Queue extends Collection, Queue.Interface {
            // Properties

            get capacity(): number;
            get remaining_capacity(): number;
            get remainingCapacity(): number;
            get is_full(): boolean;
            get isFull(): boolean;

            // Methods

            offer(element?: any | null): boolean;
            peek(): any | null;
            poll(): any | null;
            drain(recipient: Collection, amount: number): number;
            get_capacity(): number;
            get_remaining_capacity(): number;
            get_is_full(): boolean;
        }

        export const Queue: QueueNamespace & {
            new (): Queue; // This allows `obj instanceof Queue`
        };

        namespace Set {
            /**
             * Interface for implementing Set.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Collection.Interface {
                // Virtual methods

                vfunc_get_read_only_view(): Set;
            }

            // Constructor properties interface

            interface ConstructorProps extends Collection.ConstructorProps {
                read_only_view: Set;
                readOnlyView: Set;
            }
        }

        export interface SetNamespace {
            $gtype: GObject.GType<Set>;
            prototype: Set;

            empty(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): Set;
        }
        interface Set extends Collection {
            // Properties

            get read_only_view(): Set;
            get readOnlyView(): Set;

            // Methods

            get_read_only_view(): Set;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_get_read_only_view(): Set;
            /** @ignore */
            vfunc_get_read_only_view(): Collection;
        }

        export const Set: SetNamespace & {
            new (): Set; // This allows `obj instanceof Set`
        };

        namespace SortedMap {
            /**
             * Interface for implementing SortedMap.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Map.Interface {
                // Virtual methods

                vfunc_head_map(before?: any | null): SortedMap;
                vfunc_tail_map(after?: any | null): SortedMap;
                vfunc_sub_map(before?: any | null, after?: any | null): SortedMap;
                vfunc_get_ascending_keys(): SortedSet;
                vfunc_get_ascending_entries(): SortedSet;
                vfunc_get_read_only_view(): SortedMap;
            }

            // Constructor properties interface

            interface ConstructorProps extends Map.ConstructorProps {
                ascending_keys: SortedSet;
                ascendingKeys: SortedSet;
                ascending_entries: SortedSet;
                ascendingEntries: SortedSet;
                read_only_view: SortedMap;
                readOnlyView: SortedMap;
            }
        }

        export interface SortedMapNamespace {
            $gtype: GObject.GType<SortedMap>;
            prototype: SortedMap;

            empty(
                k_type: GObject.GType,
                k_dup_func: GObject.BoxedCopyFunc,
                v_type: GObject.GType,
                v_dup_func: GObject.BoxedCopyFunc,
            ): Map;
        }
        interface SortedMap extends Map {
            // Properties

            get ascending_keys(): SortedSet;
            get ascendingKeys(): SortedSet;
            get ascending_entries(): SortedSet;
            get ascendingEntries(): SortedSet;
            get read_only_view(): SortedMap;
            get readOnlyView(): SortedMap;

            // Methods

            head_map(before?: any | null): SortedMap;
            tail_map(after?: any | null): SortedMap;
            sub_map(before?: any | null, after?: any | null): SortedMap;
            get_ascending_keys(): SortedSet;
            get_ascending_entries(): SortedSet;
            get_read_only_view(): SortedMap;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_head_map(before?: any | null): SortedMap;
            /** @ignore */
            vfunc_tail_map(after?: any | null): SortedMap;
            /** @ignore */
            vfunc_sub_map(before?: any | null, after?: any | null): SortedMap;
            /** @ignore */
            vfunc_get_ascending_keys(): SortedSet;
            /** @ignore */
            vfunc_get_ascending_entries(): SortedSet;
            /** @ignore */
            vfunc_get_read_only_view(): SortedMap;
            /** @ignore */
            vfunc_get_read_only_view(): Map;
        }

        export const SortedMap: SortedMapNamespace & {
            new (): SortedMap; // This allows `obj instanceof SortedMap`
        };

        namespace SortedSet {
            /**
             * Interface for implementing SortedSet.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface extends Set.Interface {
                // Virtual methods

                vfunc_first(): any | null;
                vfunc_last(): any | null;
                vfunc_iterator_at(element?: any | null): Iterator | null;
                vfunc_lower(element?: any | null): any | null;
                vfunc_higher(element?: any | null): any | null;
                vfunc_floor(element?: any | null): any | null;
                vfunc_ceil(element?: any | null): any | null;
                vfunc_head_set(before?: any | null): SortedSet;
                vfunc_tail_set(after?: any | null): SortedSet;
                vfunc_sub_set(from?: any | null, to?: any | null): SortedSet;
                vfunc_get_read_only_view(): SortedSet;
            }

            // Constructor properties interface

            interface ConstructorProps extends Set.ConstructorProps {
                read_only_view: SortedSet;
                readOnlyView: SortedSet;
            }
        }

        export interface SortedSetNamespace {
            $gtype: GObject.GType<SortedSet>;
            prototype: SortedSet;

            empty(g_type: GObject.GType, g_dup_func: GObject.BoxedCopyFunc): SortedSet;
        }
        interface SortedSet extends Set {
            // Properties

            get read_only_view(): SortedSet;
            get readOnlyView(): SortedSet;

            // Methods

            first(): any | null;
            last(): any | null;
            iterator_at(element?: any | null): Iterator | null;
            lower(element?: any | null): any | null;
            higher(element?: any | null): any | null;
            floor(element?: any | null): any | null;
            ceil(element?: any | null): any | null;
            head_set(before?: any | null): SortedSet;
            tail_set(after?: any | null): SortedSet;
            sub_set(from?: any | null, to?: any | null): SortedSet;
            get_read_only_view(): SortedSet;

            // Virtual methods - generated with overloads due to conflicts

            /** @ignore */
            vfunc_first(): any | null;
            /** @ignore */
            vfunc_last(): any | null;
            /** @ignore */
            vfunc_iterator_at(element?: any | null): Iterator | null;
            /** @ignore */
            vfunc_lower(element?: any | null): any | null;
            /** @ignore */
            vfunc_higher(element?: any | null): any | null;
            /** @ignore */
            vfunc_floor(element?: any | null): any | null;
            /** @ignore */
            vfunc_ceil(element?: any | null): any | null;
            /** @ignore */
            vfunc_head_set(before?: any | null): SortedSet;
            /** @ignore */
            vfunc_tail_set(after?: any | null): SortedSet;
            /** @ignore */
            vfunc_sub_set(from?: any | null, to?: any | null): SortedSet;
            /** @ignore */
            vfunc_get_read_only_view(): SortedSet;
            /** @ignore */
            vfunc_get_read_only_view(): Set;
            /** @ignore */
            vfunc_get_read_only_view(): Collection;
        }

        export const SortedSet: SortedSetNamespace & {
            new (): SortedSet; // This allows `obj instanceof SortedSet`
        };

        namespace Traversable {
            /**
             * Interface for implementing Traversable.
             * Contains only the virtual methods that need to be implemented.
             */
            interface Interface {
                // Virtual methods

                vfunc_foreach(f: ForallFunc): boolean;
                vfunc_stream(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: StreamFunc): Iterator;
                vfunc_fold(
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    f: FoldFunc,
                    seed?: any | null,
                ): any | null;
                vfunc_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: MapFunc): Iterator;
                vfunc_scan(
                    a_type: GObject.GType,
                    a_dup_func: GObject.BoxedCopyFunc,
                    f: FoldFunc,
                    seed?: any | null,
                ): Iterator;
                vfunc_filter(pred: Predicate): Iterator;
                vfunc_chop(offset: number, length: number): Iterator;
                vfunc_flat_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FlatMapFunc): Iterator;
                vfunc_tee(forks: number): Iterator[];
                vfunc_first_match(pred: Predicate): any | null;
                vfunc_any_match(pred: Predicate): boolean;
                vfunc_all_match(pred: Predicate): boolean;
                vfunc_max(compare: GLib.CompareDataFunc): any | null;
                vfunc_min(compare: GLib.CompareDataFunc): any | null;
                vfunc_order_by(compare?: GLib.CompareDataFunc | null): Iterator;
                vfunc_get_element_type(): GObject.GType;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        export interface TraversableNamespace {
            $gtype: GObject.GType<Traversable>;
            prototype: Traversable;
        }
        interface Traversable extends GObject.Object, Traversable.Interface {
            // Methods

            foreach(f: ForallFunc): boolean;
            stream(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: StreamFunc): Iterator;
            fold(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FoldFunc, seed?: any | null): any | null;
            map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: MapFunc): Iterator;
            scan(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FoldFunc, seed?: any | null): Iterator;
            filter(pred: Predicate): Iterator;
            chop(offset: number, length: number): Iterator;
            flat_map(a_type: GObject.GType, a_dup_func: GObject.BoxedCopyFunc, f: FlatMapFunc): Iterator;
            tee(forks: number): Iterator[];
            first_match(pred: Predicate): any | null;
            any_match(pred: Predicate): boolean;
            all_match(pred: Predicate): boolean;
            max(compare: GLib.CompareDataFunc): any | null;
            min(compare: GLib.CompareDataFunc): any | null;
            order_by(compare?: GLib.CompareDataFunc | null): Iterator;
            get_element_type(): GObject.GType;
        }

        export const Traversable: TraversableNamespace & {
            new (): Traversable; // This allows `obj instanceof Traversable`
        };

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

    export default Gee;
}

declare module 'gi://Gee' {
    import Gee08 from 'gi://Gee?version=0.8';
    export default Gee08;
}
// END
