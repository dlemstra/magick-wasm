/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 *  Specified the type of noise that should be added to the image.
 */
export const NoiseType = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Uniform.
     */
    Uniform: 1,

    /**
     * Gaussian.
     */
    Gaussian: 2,

    /**
     * Multiplicative Gaussian.
     */
    MultiplicativeGaussian: 3,

    /**
     * Impulse.
     */
    Impulse: 4,

    /**
     * Laplacian.
     */
    Laplacian: 5,

    /**
     * Poisson.
     */
    Poisson: 6,

    /**
     * Random.
     */
    Random: 7
} as const;

export type NoiseType = typeof NoiseType[keyof typeof NoiseType];
