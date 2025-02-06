/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 *  Specifies the morphology methods.
 */
export const MorphologyMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Convolve.
     */
    Convolve: 1,

    /**
     * Correlate.
     */
    Correlate: 2,

    /**
     * Erode.
     */
    Erode: 3,

    /**
     * Dilate.
     */
    Dilate: 4,

    /**
     * Erode intensity.
     */
    ErodeIntensity: 5,

    /**
     * Dilate intensity.
     */
    DilateIntensity: 6,

    /**
     * Iterative distance.
     */
    IterativeDistance: 7,

    /**
     * Open.
     */
    Open: 8,

    /**
     * Close.
     */
    Close: 9,

    /**
     * Open intensity.
     */
    OpenIntensity: 10,

    /**
     * Close intensity.
     */
    CloseIntensity: 11,

    /**
     * Smooth.
     */
    Smooth: 12,

    /**
     * Edge in.
     */
    EdgeIn: 13,

    /**
     * Edge out.
     */
    EdgeOut: 14,

    /**
     * Edge.
     */
    Edge: 15,

    /**
     * Top hat.
     */
    TopHat: 16,

    /**
     * Bottom hat.
     */
    BottomHat: 17,

    /**
     * Hit and miss.
     */
    HitAndMiss: 18,

    /**
     * Thinning.
     */
    Thinning: 19,

    /**
     * Thicken.
     */
    Thicken: 20,

    /**
     * Distance.
     */
    Distance: 21,

    /**
     * Voronoi.
     */
    Voronoi: 22
} as const;

export type MorphologyMethod = typeof MorphologyMethod[keyof typeof MorphologyMethod];
