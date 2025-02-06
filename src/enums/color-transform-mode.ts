/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies color transform modes.
 */
export const ColorTransformMode = {
    /**
     * High resolution (double).
     */
    HighRes: 0,

    /**
     * Quantum.
     */
    Quantum: 1
} as const;

export type ColorTransformMode = typeof ColorTransformMode[keyof typeof ColorTransformMode];
