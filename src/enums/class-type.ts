/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the image class type.
 */
export const ClassType = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Direct.
     */
    Direct: 1,

    /**
     * Pseudo.
     */
    Pseudo: 2
} as const;

export type ClassType = typeof ClassType[keyof typeof ClassType];
