/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the paint methods.
 */
export const PaintMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Select the target pixel.
     */
    Point: 1,

    /**
     * Select any pixel that matches the target pixel.
     */
    Replace: 2,

    /**
     * Select the target pixel and matching neighbors.
     */
    Floodfill: 3,

    /**
     * Select the target pixel and neighbors not matching border color.
     */
    FillToBorder: 4,

    /**
     * Select all pixels.
     */
    Reset: 5
} as const;

export type PaintMethod = typeof PaintMethod[keyof typeof PaintMethod];
