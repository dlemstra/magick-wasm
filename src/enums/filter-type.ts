/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the filter types.
 */
export const FilterType = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Point.
     */
    Point: 1,

    /**
     * Box.
     */
    Box: 2,

    /**
     * Triangle.
     */
    Triangle: 3,

    /**
     * Hermite.
     */
    Hermite: 4,

    /**
     * Hann.
     */
    Hann: 5,

    /**
     * Hamming.
     */
    Hamming: 6,

    /**
     * Blackman.
     */
    Blackman: 7,

    /**
     * Gaussian.
     */
    Gaussian: 8,

    /**
     * Quadratic.
     */
    Quadratic: 9,

    /**
     * Cubic.
     */
    Cubic: 10,

    /**
     * Catrom.
     */
    Catrom: 11,

    /**
     * Mitchell.
     */
    Mitchell: 12,

    /**
     * Jinc.
     */
    Jinc: 13,

    /**
     * Sinc.
     */
    Sinc: 14,

    /**
     * Sinc fast.
     */
    SincFast: 15,

    /**
     * Kaiser.
     */
    Kaiser: 16,

    /**
     * Welch.
     */
    Welch: 17,

    /**
     * Parzen.
     */
    Parzen: 18,

    /**
     * Bohman.
     */
    Bohman: 19,

    /**
     * Bartlett.
     */
    Bartlett: 20,

    /**
     * Lagrange.
     */
    Lagrange: 21,

    /**
     * Lanczos.
     */
    Lanczos: 22,

    /**
     * Lanczos sharp.
     */
    LanczosSharp: 23,

    /**
     * Lanczos 2.
     */
    Lanczos2: 24,

    /**
     * Lanczos 2 sharp.
     */
    Lanczos2Sharp: 25,

    /**
     * Robidoux.
     */
    Robidoux: 26,

    /**
     * Robidoux sharp.
     */
    RobidouxSharp: 27,

    /**
     * Cosine.
     */
    Cosine: 28,

    /**
     * Spline.
     */
    Spline: 29,

    /**
     * Lanczos radius.
     */
    LanczosRadius: 30,

    /**
     * Cubic spline.
     */
    CubicSpline: 31,

    /**
     * Magic kernel sharp 2013.
     */
    MagicKernelSharp2013: 32,

    /**
     * Magic kernel sharp 2021.
     */
    MagicKernelSharp2021: 33,
} as const;

export type FilterType = typeof FilterType[keyof typeof FilterType];
