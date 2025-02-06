/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies gif disposal methods.
 */
export const GifDisposeMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * None.
     */
    None: 1,

    /**
     * Background.
     */
    Background: 2,

    /**
     * Previous.
     */
    Previous: 3
} as const;

export type GifDisposeMethod = typeof GifDisposeMethod[keyof typeof GifDisposeMethod];
