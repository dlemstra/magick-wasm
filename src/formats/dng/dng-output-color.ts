// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

export enum DngOutputColor {
    // Raw color (unique to each camera).
    Raw = 0,

    // sRGB D65 (default).
    SRGB = 1,

    // Adobe RGB (1998) D65.
    AdobeRGB = 2,

    // Wide Gamut RGB D65.
    WideGamutRGB = 3,

    // Kodak ProPhoto RGB D65.
    KodakProPhotoRGB = 4,

    XYZ = 5,

    // Academy Color Encoding System.
    ACES = 6,
}
