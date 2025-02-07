/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the pixel intensity methods.
 */
export const PixelIntensityMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Average.
     */
    Average: 1,

    /**
     * Brightness.
     */
    Brightness: 2,

    /**
     * Lightness.
     */
    Lightness: 3,

    /**
     * MS.
     */
    MS: 4,

    /**
     * Rec601Luma.
     */
    Rec601Luma: 5,

    /**
     * Rec601Luminance.
     */
    Rec601Luminance: 6,

    /**
     * Rec709Luma.
     */
    Rec709Luma: 7,

    /**
     * Rec709Luminance.
     */
    Rec709Luminance: 8,

    /**
     * RMS.
     */
    RMS: 9
} as const;

export type PixelIntensityMethod = typeof PixelIntensityMethod[keyof typeof PixelIntensityMethod];
