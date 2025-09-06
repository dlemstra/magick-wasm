/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies fill rule.
 */
export const FillRule = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Even odd.
     */
    EvenOdd: 1,

    /**
     * Non zero.
     */
    NonZero: 2
} as const;

export type FillRule = typeof FillRule[keyof typeof FillRule];
