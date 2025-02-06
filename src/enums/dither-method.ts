/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies dither methods.
 */
export const DitherMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * No.
     */
    No: 1,

    /**
     * Riemersma.
     */
    Riemersma: 2,

    /**
     * FloydSteinberg.
     */
    FloydSteinberg: 3
} as const;

export type DitherMethod = typeof DitherMethod[keyof typeof DitherMethod];
