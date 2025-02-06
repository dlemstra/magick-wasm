/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/** @internal */
export const LayerMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Coalesce.
     */
    Coalesce: 1,

    /**
     * Compare any.
     */
    CompareAny: 2,

    /**
     * Compare clear.
     */
    CompareClear: 3,

    /**
     * Compare overlay.
     */
    CompareOverlay: 4,

    /**
     * Dispose.
     */
    Dispose: 5,

    /**
     * Optimize.
     */
    Optimize: 6,

    /**
     * Optimize image.
     */
    OptimizeImage: 7,

    /**
     * Optimize plus.
     */
    OptimizePlus: 8,

    /**
     * Optimize transparency.
     */
    OptimizeTrans: 9,

    /**
     * Remove duplicates.
     */
    RemoveDups: 10,

    /**
     * Remove zero.
     */
    RemoveZero: 11,

    /**
     * Composite.
     */
    Composite: 12,

    /**
     * Merge.
     */
    Merge: 13,

    /**
     * Flatten.
     */
    Flatten: 14,

    /**
     * Mosaic.
     */
    Mosaic: 15,

    /**
     * Trimbounds.
     */
    Trimbounds: 16
} as const;

export type LayerMethod = typeof LayerMethod[keyof typeof LayerMethod];
