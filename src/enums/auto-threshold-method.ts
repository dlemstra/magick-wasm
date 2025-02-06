/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the auto threshold methods.
 */
export const AutoThresholdMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Kapur.
     */
    Kapur: 1,

    /**
     * OTSU.
     */
    OTSU: 2,

    /**
     * Triangle.
     */
    Triangle: 3,
} as const;

export type AutoThresholdMethod = typeof AutoThresholdMethod[keyof typeof AutoThresholdMethod];
