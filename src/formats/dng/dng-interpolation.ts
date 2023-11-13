// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Defines the dng interpolation quality.
 */
export enum DngInterpolation {
    /**
     * Interpolation will be disabled.
     */
    Disabled = -1,

    /**
     * Linear interpolation.
     */
    Linear = 0,

    /**
     * VNG interpolation.
     */
    Vng = 1,

    /**
     * PPG interpolation.
     */
    Ppg = 2,

    /**
     * AHD interpolation.
     */
    Ahd = 3,

    /**
     * DCB interpolation.
     */
    DCB = 4,

    /**
     * DHT interpolation.
     */
    Dht = 11,

    /**
     * Modified AHD interpolation (by Anton Petrusevich).
     */
    ModifiedAhd = 12,
}
