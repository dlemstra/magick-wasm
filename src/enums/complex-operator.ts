/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies a kind of complex operator.
 */
export enum ComplexOperator {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Add.
     */
    Add,

    /**
     * Conjugate.
     */
    Conjugate,

    /**
     * Divide.
     */
    Divide,

    /**
     * Magnitude phase.
     */
    MagnitudePhase,

    /**
     * Multiply.
     */
    Multiply,

    /**
     * Real imaginary.
     */
    RealImaginary,

    /**
     * Subtract.
     */
    Subtract,
}
