/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the evaluate functions.
 */
export const EvaluateFunction = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Arcsin.
     */
    Arcsin: 1,

    /**
     * Arctan.
     */
    Arctan: 2,

    /**
     * Polynomial.
     */
    Polynomial: 3,

    /**
     * Sinusoid.
     */
    Sinusoid: 4,
} as const;

export type EvaluateFunction = typeof EvaluateFunction[keyof typeof EvaluateFunction];
