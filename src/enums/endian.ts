/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies endian.
 */
export const Endian = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Least significant bit, byte 0 is least significant.
     */
    LSB: 1,

    /**
     * Most significant bit, byte 0 is most significant.
     */
    MSB: 2
} as const;

export type Endian = typeof Endian[keyof typeof Endian];
