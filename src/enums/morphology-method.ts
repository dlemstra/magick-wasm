// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 *  Specifies the morphology methods.
 */
export enum MorphologyMethod {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Convolve.
     */
    Convolve,

    /**
     * Correlate.
     */
    Correlate,

    /**
     * Erode.
     */
    Erode,

    /**
     * Dilate.
     */
    Dilate,

    /**
     * Erode intensity.
     */
    ErodeIntensity,

    /**
     * Dilate intensity.
     */
    DilateIntensity,

    /**
     * Iterative distance.
     */
    IterativeDistance,

    /**
     * Open.
     */
    Open,

    /**
     * Close.
     */
    Close,

    /**
     * Open intensity.
     */
    OpenIntensity,

    /**
     * Close intensity.
     */
    CloseIntensity,

    /**
     * Smooth.
     */
    Smooth,

    /**
     * Edge in.
     */
    EdgeIn,

    /**
     * Edge out.
     */
    EdgeOut,

    /**
     * Edge.
     */
    Edge,

    /**
     * Top hat.
     */
    TopHat,

    /**
     * Bottom hat.
     */
    BottomHat,

    /**
     * Hit and miss.
     */
    HitAndMiss,

    /**
     * Thinning.
     */
    Thinning,

    /**
     * Thicken.
     */
    Thicken,

    /**
     * Distance.
     */
    Distance,

    /**
     * Voronoi.
     */
    Voronoi,
}
