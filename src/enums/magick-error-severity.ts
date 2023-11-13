// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies the severity of a MagickError.
 */
export enum MagickErrorSeverity {
    /**
     * Error.
     */
    Error = 400,

    /**
     * Resource limit error.
     */
    ResourceLimitError = 400,

    /**
     * Type error.
     */
    TypeError = 405,

    /**
     * Option error.
     */
    OptionError = 410,

    /**
     * Delegate error.
     */
    DelegateError = 415,

    /**
     * Missing delegate error.
     */
    MissingDelegateError = 420,

    /**
     * Corrupt image error.
     */
    CorruptImageError = 425,

    /**
     * File open error.
     */
    FileOpenError = 430,

    /**
     * Blob error.
     */
    BlobError = 435,

    /**
     * Stream error.
     */
    StreamError = 440,

    /**
     * Cache error.
     */
    CacheError = 445,

    /**
     * Coder error.
     */
    CoderError = 450,

    /**
     * Filter error.
     */
    FilterError = 452,

    /**
     * Module error.
     */
    ModuleError = 455,

    /**
     * Draw error.
     */
    DrawError = 460,

    /**
     * Image error.
     */
    ImageError = 465,

    /**
     * Wand error.
     */
    WandError = 470,

    /**
     * Random error.
     */
    RandomError = 475,

    /**
     * X server error.
     */
    XServerError = 480,

    /**
     * Monitor error.
     */
    MonitorError = 485,

    /**
     * Registry error.
     */
    RegistryError = 490,

    /**
     * Configure error.
     */
    ConfigureError = 495,

    /**
     * Policy error.
     */
    PolicyError = 499
}
