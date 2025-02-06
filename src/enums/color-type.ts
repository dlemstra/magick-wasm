/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the color type of the image.
 */
export const ColorType = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Bilevel.
     */
    Bilevel: 1,

    /**
     * Grayscale.
     */
    Grayscale: 2,

    /**
     * Grayscale alpha.
     */
    GrayscaleAlpha: 3,

    /**
     * Palette.
     */
    Palette: 4,

    /**
     * Palette alpha.
     */
    PaletteAlpha: 5,

    /**
     * Truecolor.
     */
    TrueColor: 6,

    /**
     * Truecolor alpha.
     */
    TrueColorAlpha: 7,

    /**
     * Color separation.
     */
    ColorSeparation: 8,

    /**
     * Color separation alpha.
     */
    ColorSeparationAlpha: 9,

    /**
     * Optimize.
     */
    Optimize: 10,

    /**
     * Palette bilevel alpha.
     */
    PaletteBilevelAlpha: 11
} as const;

export type ColorType = typeof ColorType[keyof typeof ColorType];
