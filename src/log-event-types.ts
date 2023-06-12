// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

export enum LogEventTypes
{
    None = 0x000000,
    Accelerate = 0x00001,
    Annotate = 0x00002,
    Blob = 0x00004,
    Cache = 0x00008,
    Coder = 0x00010,
    Configure = 0x00020,
    Deprecate = 0x00040,
    Draw = 0x00080,
    Exception = 0x00100,
    Image = 0x00200,
    Locale = 0x00400,
    Module = 0x00800,
    Pixel = 0x01000,
    Policy = 0x02000,
    Resource = 0x04000,
    Trace = 0x08000,
    Transform = 0x10000,
    User = 0x20000,
    Wand = 0x40000,
    Detailed = 0x7fff7fff,
    All = Detailed | Trace,
}
