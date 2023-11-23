// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies the severity of a MagickError.
 */
export enum MagickErrorSeverity {
    /**
     * Warning.
     */
    Warning = 300,

    /**
     * Resource limit warning.
     */
    ResourceLimitWarning = 300,

    /**
     * Type warning.
     */
    TypeWarning = 305,

    /**
     * Option warning.
     */
    OptionWarning = 310,

    /**
     * Delegate warning.
     */
    DelegateWarning = 315,

    /**
     * Missing delegate warning.
     */
    MissingDelegateWarning = 320,

    /**
     * Corrupt image warning.
     */
    CorruptImageWarning = 325,

    /**
     * File open warning.
     */
    FileOpenWarning = 330,

    /**
     * Blob warning.
     */
    BlobWarning = 335,

    /**
     * Stream warning.
     */
    StreamWarning = 340,

    /**
     * Cache warning.
     */
    CacheWarning = 345,

    /**
     * Coder warning.
     */
    CoderWarning = 350,

    /**
     * Filter warning.
     */
    FilterWarning = 352,

    /**
     * Module warning.
     */
    ModuleWarning = 355,

    /**
     * Draw warning.
     */
    DrawWarning = 360,

    /**
     * Image warning.
     */
    ImageWarning = 365,

    /**
     * Wand warning.
     */
    WandWarning = 370,

    /**
     * Random warning.
     */
    RandomWarning = 375,

    /**
     * X server warning.
     */
    XServerWarning = 380,

    /**
     * Monitor warning.
     */
    MonitorWarning = 385,

    /**
     * Registry warning.
     */
    RegistryWarning = 390,

    /**
     * Configure warning.
     */
    ConfigureWarning = 395,

    /**
     * Policy warning.
     */
    PolicyWarning = 399,

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
