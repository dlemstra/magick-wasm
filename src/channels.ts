// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

export enum Channels {
    Undefined = 0x0000,
    Red = 0x0001,
    Gray = 0x0001,
    Cyan = 0x0001,
    Green = 0x0002,
    Magenta = 0x0002,
    Blue = 0x0004,
    Yellow = 0x0004,
    Black = 0x0008,
    Alpha = 0x0010,
    Opacity = 0x0010,
    Index = 0x0020,
    Composite = 0x001F,
    All = 0x7ffffff,
    TrueAlpha = 0x0100,
    RGB = Red | Green | Blue,
    CMYK = Cyan | Magenta | Yellow | Black,
    Grays = 0x0400,
    Sync = 0x20000,
    Default = All,
}
