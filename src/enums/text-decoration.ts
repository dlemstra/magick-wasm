/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the types of text decoration.
 */
export const TextDecoration = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * None.
     */
    None: 1,

    /**
     * Underline.
     */
    Underline: 2,

    /**
     * Overline.
     */
    Overline: 3,

    /**
     * Line through.
     */
    LineThrough: 4
} as const;

export type TextDecoration = typeof TextDecoration[keyof typeof TextDecoration];
