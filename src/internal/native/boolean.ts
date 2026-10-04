/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/** @internal */
export function _fromBoolean(value: boolean): number {
    return value ? 1 : 0;
}

/** @internal */
export function _toBoolean(value: number): boolean {
    return value === 1;
}
