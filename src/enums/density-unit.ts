/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Units of image resolution.
 */
export const DensityUnit = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Pixels per inch.
     */
    PixelsPerInch: 1,

    /**
     * Pixels per centimeter.
     */
    PixelsPerCentimeter: 2
} as const;

export type DensityUnit = typeof DensityUnit[keyof typeof DensityUnit];
