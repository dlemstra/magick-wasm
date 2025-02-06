/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the evaluate operator.
 */
export const EvaluateOperator = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Abs.
     */
    Abs: 1,

    /**
     * Add.
     */
    Add: 2,

    /**
     * Add modulus.
     */
    AddModulus: 3,

    /**
     * And.
     */
    And: 4,

    /**
     * Cosine.
     */
    Cosine: 5,

    /**
     * Divide.
     */
    Divide: 6,

    /**
     * Exponential.
     */
    Exponential: 7,

    /**
     * Gaussian noise.
     */
    GaussianNoise: 8,

    /**
     * Impulse noise.
     */
    ImpulseNoise: 9,

    /**
     * Laplacian noise.
     */
    LaplacianNoise: 10,

    /**
     * Left shift.
     */
    LeftShift: 11,

    /**
     * Log.
     */
    Log: 12,

    /**
     * Max.
     */
    Max: 13,

    /**
     * Mean.
     */
    Mean: 14,

    /**
     * Median.
     */
    Median: 15,

    /**
     * Min.
     */
    Min: 16,

    /**
     * Multiplicative noise.
     */
    MultiplicativeNoise: 17,

    /**
     * Multiply.
     */
    Multiply: 18,

    /**
     * Or.
     */
    Or: 19,

    /**
     * Poisson noise.
     */
    PoissonNoise: 20,

    /**
     * Pow.
     */
    Pow: 21,

    /**
     * Right shift.
     */
    RightShift: 22,

    /**
     * Root mean square.
     */
    RootMeanSquare: 23,

    /**
     * Set.
     */
    Set: 24,

    /**
     * Sine.
     */
    Sine: 25,

    /**
     * Subtract.
     */
    Subtract: 26,

    /**
     * Sum.
     */
    Sum: 27,

    /**
     * Threshold black.
     */
    ThresholdBlack: 28,

    /**
     * Threshold.
     */
    Threshold: 29,

    /**
     * Threshold white.
     */
    ThresholdWhite: 30,

    /**
     * Uniform noise.
     */
    UniformNoise: 31,

    /**
     * Xor.
     */
    Xor: 32,

    /**
     * Inverse log.
     */
    InverseLog: 33
} as const;

export type EvaluateOperator = typeof EvaluateOperator[keyof typeof EvaluateOperator];
