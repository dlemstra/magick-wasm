// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../image-magick';
import { quantumArray } from '../../wasm/magick';

/** @internal */
export function _withDoubleArray<TReturnType>(array: number[], func: (instance: number) => TReturnType): TReturnType {
    const length = array.length * 8;
    if (length === 0)
        return func(0);

    const instance = ImageMagick._api._malloc(length);
    try {
        const buffer = new ArrayBuffer(length);
        const doubleArray = new Float64Array(buffer);
        for(let i=0; i < array.length; i++)
            doubleArray[i] = array[i];
        ImageMagick._api.HEAPU8.set(new Int8Array(buffer), instance);
        return func(instance);
    }
    finally {
        ImageMagick._api._free(instance);
    }
}

/** @internal */
export function _withQuantumArray<TReturnType>(array: quantumArray, func: (instance: number) => TReturnType): TReturnType {
    const length = array.length * 8;
    if (length === 0)
        return func(0);

    const instance = ImageMagick._api._malloc(length);
    try {
        ImageMagick._api.HEAPU8.set(array, instance);
        return func(instance);
    }
    finally {
        ImageMagick._api._free(instance);
    }
}
