/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the color type of the image.
 */
export enum ColorType {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Bilevel.
     */
    Bilevel,

    /**
     * Grayscale.
     */
    Grayscale,

    /**
     * Grayscale alpha.
     */
    GrayscaleAlpha,

    /**
     * Palette.
     */
    Palette,

    /**
     * Palette alpha.
     */
    PaletteAlpha,

    /**
     * Truecolor.
     */
    TrueColor,

    /**
     * Truecolor alpha.
     */
    TrueColorAlpha,

    /**
     * Color separation.
     */
    ColorSeparation,

    /**
     * Color separation alpha.
     */
    ColorSeparationAlpha,

    /**
     * Optimize.
     */
    Optimize,

    /**
     * Palette bilevel alpha.
     */
    PaletteBilevelAlpha
}
