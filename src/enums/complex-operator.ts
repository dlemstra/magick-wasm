/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies a kind of complex operator.
 */
export const ComplexOperator = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Add.
     */
    Add: 1,

    /**
     * Conjugate.
     */
    Conjugate: 2,

    /**
     * Divide.
     */
    Divide: 3,

    /**
     * Magnitude phase.
     */
    MagnitudePhase: 4,

    /**
     * Multiply.
     */
    Multiply: 5,

    /**
     * Real imaginary.
     */
    RealImaginary: 6,

    /**
     * Subtract.
     */
    Subtract: 7
} as const;

export type ComplexOperator = typeof ComplexOperator[keyof typeof ComplexOperator];
