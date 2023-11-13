// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Defines the dng output colors.
 */
export enum DngOutputColor {
    /** Raw color (unique to each camera). */
    Raw = 0,

    /** sRGB D65 (default). */
    SRGB = 1,

    /** Adobe RGB (1998) D65. */
    AdobeRGB = 2,

    /** Wide Gamut RGB D65. */
    WideGamutRGB = 3,

    /** Kodak ProPhoto RGB D65. */
    KodakProPhotoRGB = 4,

    /**  CIE 1931 XYZ */
    XYZ = 5,

    /** Academy Color Encoding System. */
    ACES = 6,
}
