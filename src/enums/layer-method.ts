// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/** @internal */
export enum LayerMethod {
    Undefined,
    Coalesce,
    CompareAny,
    CompareClear,
    CompareOverlay,
    Dispose,
    Optimize,
    OptimizeImage,
    OptimizePlus,
    OptimizeTrans,
    RemoveDups,
    RemoveZero,
    Composite,
    Merge,
    Flatten,
    Mosaic,
    Trimbounds,
}
