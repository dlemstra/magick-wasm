/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

export type ByteArray = Int8Array | Uint8Array | Uint8ClampedArray;

/** @internal */
export function _isByteArray(value: unknown): value is ByteArray
{
    return value instanceof Int8Array || value instanceof Uint8Array || value instanceof Uint8ClampedArray;
}
