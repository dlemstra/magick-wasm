/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/** @internal */
export const LayerMethod = {
    Undefined: 0,
    Coalesce: 1,
    CompareAny: 2,
    CompareClear: 3,
    CompareOverlay: 4,
    Dispose: 5,
    Optimize: 6,
    OptimizeImage: 7,
    OptimizePlus: 8,
    OptimizeTrans: 9,
    RemoveDups: 10,
    RemoveZero: 11,
    Composite: 12,
    Merge: 13,
    Flatten: 14,
    Mosaic: 15,
    Trimbounds: 16
} as const;

/** @internal */
export type LayerMethod = typeof LayerMethod[keyof typeof LayerMethod];
