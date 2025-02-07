/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the pixel interpolate methods.
 */
export const PixelInterpolateMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Average.
     */
    Average: 1,

    /**
     * Average9.
     */
    Average9: 2,

    /**
     * Average16.
     */
    Average16: 3,

    /**
     * Background.
     */
    Background: 4,

    /**
     * Bilinear.
     */
    Bilinear: 5,

    /**
     * Blend.
     */
    Blend: 6,

    /**
     * Catrom.
     */
    Catrom: 7,

    /**
     * Integer.
     */
    Integer: 8,

    /**
     * Mesh.
     */
    Mesh: 9,

    /**
     * Nearest.
     */
    Nearest: 10,

    /**
     * Spline.
     */
    Spline: 11
} as const;

export type PixelInterpolateMethod = typeof PixelInterpolateMethod[keyof typeof PixelInterpolateMethod];
