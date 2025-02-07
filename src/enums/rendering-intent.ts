/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the types of rendering intent.
 */
export const RenderingIntent = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Saturation.
     */
    Saturation: 1,

    /**
     * Perceptual.
     */
    Perceptual: 2,

    /**
     * Absolute.
     */
    Absolute: 3,

    /**
     * Relative.
     */
    Relative: 4
} as const;

export type RenderingIntent = typeof RenderingIntent[keyof typeof RenderingIntent];
