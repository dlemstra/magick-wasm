/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the statistic types.
 */
export const StatisticType = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Gradient.
     */
    Gradient: 1,

    /**
     * Maximum.
     */
    Maximum: 2,

    /**
     * Mean.
     */
    Mean: 3,

    /**
     * Median.
     */
    Median: 4,

    /**
     * Minimum.
     */
    Minimum: 5,

    /**
     * Mode.
     */
    Mode: 6,

    /**
     * Nonpeak.
     */
    Nonpeak: 7,

    /**
     * Root mean square.
     */
    RootMeanSquare: 8,

    /**
     * Standard deviation.
     */
    StandardDeviation: 9,
} as const;

export type StatisticType = typeof StatisticType[keyof typeof StatisticType];
