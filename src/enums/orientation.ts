/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specified the photo orientation of the image.
 */
export const Orientation = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Top left.
     */
    TopLeft: 1,

    /**
     * Top right.
     */
    TopRight: 2,

    /**
     * Bottom right.
     */
    BottomRight: 3,

    /**
     * Bottom left.
     */
    BottomLeft: 4,

    /**
     * Left top.
     */
    LeftTop: 5,

    /**
     * Right top.
     */
    RightTop: 6,

    /**
     * Right bottom.
     */
    RightBottom: 7,

    /**
     * Left bottom.
     */
    LeftBottom: 8
} as const;

export type Orientation = typeof Orientation[keyof typeof Orientation];
