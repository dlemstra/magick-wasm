/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the error metric types.
 */
export enum ErrorMetric {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Absolute.
     */
    Absolute,

    /**
     * Fuzz.
     */
    Fuzz,

    /**
     * Mean absolute.
     */
    MeanAbsolute,

    /**
     * Mean error per pixel.
     */
    MeanErrorPerPixel,

    /**
     * Mean squared.
     */
    MeanSquared,

    /**
     * Normalized cross correlation.
     */
    NormalizedCrossCorrelation,

    /**
     * Peak absolute.
     */
    PeakAbsolute,

    /**
     * Peak signal to noise ratio.
     */
    PeakSignalToNoiseRatio,

    /**
     * Perceptual hash.
     */
    PerceptualHash,

    /**
     * Root mean squared.
     */
    RootMeanSquared,

    /**
     * Structural similarity.
     */
    StructuralSimilarity,

    /**
     * Structural dissimilarity.
     */
    StructuralDissimilarity,
}
