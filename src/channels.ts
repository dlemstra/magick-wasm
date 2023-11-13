// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies channel types.
 */
export enum Channels {
    /**
     * Undefined.
     */
    Undefined = 0x0000,

    /**
     * Red.
     */
    Red = 0x0001,

    /**
     * Gray.
     */
    Gray = 0x0001,

    /**
     * Cyan.
     */
    Cyan = 0x0001,

    /**
     * Green.
     */
    Green = 0x0002,

    /**
     * Magenta.
     */
    Magenta = 0x0002,

    /**
     * Blue.
     */
    Blue = 0x0004,

    /**
     * Yellow.
     */
    Yellow = 0x0004,

    /**
     * Black.
     */
    Black = 0x0008,

    /**
     * Alpha.
     */
    Alpha = 0x0010,

    /**
     * Opacity.
     */
    Opacity = 0x0010,

    /**
     * Index.
     */
    Index = 0x0020,

    /**
     * Composite.
     */
    Composite = 0x001F,

    /**
     * All.
     */
    All = 0x7ffffff,

    /**
     * TrueAlpha.
     */
    TrueAlpha = 0x0100,

    /**
     * RGB.
     */
    RGB = Red | Green | Blue,

    /**
     * CMYK.
     */
    CMYK = Cyan | Magenta | Yellow | Black,
}
