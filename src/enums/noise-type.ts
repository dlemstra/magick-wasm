/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 *  Specified the type of noise that should be added to the image.
 */
export enum NoiseType {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Uniform.
     */
    Uniform,

    /**
     * Gaussian.
     */
    Gaussian,

    /**
     * Multiplicative Gaussian.
     */
    MultiplicativeGaussian,

    /**
     * Impulse.
     */
    Impulse,

    /**
     * Laplacian.
     */
    Laplacian,

    /// <summary>
    /// Poisson.
    /// </summary>
    Poisson,

    /// <summary>
    /// Random.
    /// </summary>
    Random,
}
