/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the types of text alignment.
 */
export const TextAlignment = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Left.
     */
    Left: 1,

    /**
     * Center.
     */
    Center: 2,

    /**
     * Right.
     */
    Right: 3
} as const;

export type TextAlignment = typeof TextAlignment[keyof typeof TextAlignment];
