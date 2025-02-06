/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the interlace types.
 */
export const Interlace = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * No interlacing.
     */
    NoInterlace: 1,

    /**
     * Line.
     */
    Line: 2,

    /**
     * Plane.
     */
    Plane: 3,

    /**
     * Partition.
     */
    Partition: 4,

    /**
     * Gif.
     */
    Gif: 5,

    /**
     * Jpeg.
     */
    Jpeg: 6,

    /**
     * Png.
     */
    Png: 7
} as const;

export type Interlace = typeof Interlace[keyof typeof Interlace];
