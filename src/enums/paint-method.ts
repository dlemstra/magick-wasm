// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies the paint methods.
 */
export enum PaintMethod {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Select the target pixel.
     */
    Point,

    /**
     * Select any pixel that matches the target pixel.
     */
    Replace,

    /**
     * Select the target pixel and matching neighbors.
     */
    Floodfill,

    /**
     * Select the target pixel and neighbors not matching border color.
     */
    FillToBorder,

    /**
     * Select all pixels.
     */
    Reset,
}
