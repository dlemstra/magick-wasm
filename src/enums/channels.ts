/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from './pixel-channel';

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
    Composite = 0x001f,

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

    /**
     * CMYKA.
     */
    CMYKA = Cyan | Magenta | Yellow | Black | Alpha,

    /**
     * Meta 0
     */
    Meta0 = 1 << PixelChannel.Meta0,

    /**
     * Meta 1
     */
    Meta1 = 1 << PixelChannel.Meta1,

    /**
     * Meta 2
     */
    Meta2 = 1 << PixelChannel.Meta2,

    /**
     * Meta 3
     */
    Meta3 = 1 << PixelChannel.Meta3,

    /**
     * Meta 4
     */
    Meta4 = 1 << PixelChannel.Meta4,

    /**
     * Meta 5
     */
    Meta5 = 1 << PixelChannel.Meta5,

    /**
     * Meta 6
     */
    Meta6 = 1 << PixelChannel.Meta6,

    /**
     * Meta 7
     */
    Meta7 = 1 << PixelChannel.Meta7,

    /**
     * Meta 8
     */
    Meta8 = 1 << PixelChannel.Meta8,

    /**
     * Meta 9
     */
    Meta9 = 1 << PixelChannel.Meta9,

    /**
     * Meta 10
     */
    Meta10 = 1 << PixelChannel.Meta10,

    /**
     * Meta 11
     */
    Meta11 = 1 << PixelChannel.Meta11,

    /**
     * Meta 12
     */
    Meta12 = 1 << PixelChannel.Meta12,

    /**
     * Meta 13
     */
    Meta13 = 1 << PixelChannel.Meta13,

    /**
     * Meta 14
     */
    Meta14 = 1 << PixelChannel.Meta14,

    /**
     * Meta 15
     */
    Meta15 = 1 << PixelChannel.Meta15,

    /**
     * Meta 16
     */
    Meta16 = 1 << PixelChannel.Meta16,

    /**
     * Meta 17
     */
    Meta17 = 1 << PixelChannel.Meta17,

    /**
     * Meta 18
     */
    Meta18 = 1 << PixelChannel.Meta18,

    /**
     * Meta 19
     */
    Meta19 = 1 << PixelChannel.Meta19,

    /**
     * Meta 20
     */
    Meta20 = 1 << PixelChannel.Meta20,

    /**
     * Meta 21
     */
    Meta21 = 1 << PixelChannel.Meta21,

    /**
     * All.
     */
    All = 0x7ffffff,
}
