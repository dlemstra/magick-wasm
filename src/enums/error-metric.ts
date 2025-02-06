/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the error metric types.
 */
export const ErrorMetric = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Absolute.
     */
    Absolute: 1,

    /**
     * Fuzz.
     */
    Fuzz: 2,

    /**
     * Mean absolute.
     */
    MeanAbsolute: 3,

    /**
     * Mean error per pixel.
     */
    MeanErrorPerPixel: 4,

    /**
     * Mean squared.
     */
    MeanSquared: 5,

    /**
     * Normalized cross correlation.
     */
    NormalizedCrossCorrelation: 6,

    /**
     * Peak absolute.
     */
    PeakAbsolute: 7,

    /**
     * Peak signal to noise ratio.
     */
    PeakSignalToNoiseRatio: 8,

    /**
     * Perceptual hash.
     */
    PerceptualHash: 9,

    /**
     * Root mean squared.
     */
    RootMeanSquared: 10,

    /**
     * Structural similarity.
     */
    StructuralSimilarity: 11,

    /**
     * Structural dissimilarity.
     */
    StructuralDissimilarity: 12
} as const;

export type ErrorMetric = typeof ErrorMetric[keyof typeof ErrorMetric];
