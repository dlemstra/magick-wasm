/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies endian.
 */
export enum Endian {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Least significant bit, byte 0 is least significant.
     */
    LSB,

    /**
     * Most significant bit, byte 0 is most significant.
     */
    MSB,
}
