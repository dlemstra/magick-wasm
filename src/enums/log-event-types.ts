/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies log event types.
 */
export enum LogEventTypes {
    /**
     * Undefined.
     */
    None = 0x000000,

    /**
     * Accelerate.
     */
    Accelerate = 0x00001,

    /**
     * Annotate.
     */
    Annotate = 0x00002,

    /**
     * Blob.
     */
    Blob = 0x00004,

    /**
     * Cache.
     */
    Cache = 0x00008,

    /**
     * Coder.
     */
    Coder = 0x00010,

    /**
     * Configure.
     */
    Configure = 0x00020,

    /**
     * Deprecate.
     */
    Deprecate = 0x00040,

    /**
     * Draw.
     */
    Draw = 0x00080,

    /**
     * Exception.
     */
    Exception = 0x00100,

    /**
     * Image.
     */
    Image = 0x00200,

    /**
     * Locale.
     */
    Locale = 0x00400,

    /**
     * Module.
     */
    Module = 0x00800,

    /**
     * Pixel.
     */
    Pixel = 0x01000,

    /**
     * Policy.
     */
    Policy = 0x02000,

    /**
     * Resource.
     */
    Resource = 0x04000,

    /**
     * Trace.
     */
    Trace = 0x08000,

    /**
     * Transform.
     */
    Transform = 0x10000,

    /**
     * User.
     */
    User = 0x20000,

    /**
     * Wand.
     */
    Wand = 0x40000,

    /**
     * Detailed.
     */
    Detailed = 0x7fff7fff,

    /**
     * All.
     */
    All = Detailed | Trace,
}
