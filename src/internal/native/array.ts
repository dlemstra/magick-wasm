/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ByteArray } from '../../byte-array';
import { ImageMagick } from '../../image-magick';
import { quantumArray } from '@dlemstra/magick-native';
import { MagickError } from '../../magick-error';

/** @internal */
export function _withByteArray<TReturnType>(array: ByteArray, func: (instance: number) => TReturnType): TReturnType {
    if (array.byteLength === 0)
        throw new MagickError('The specified array cannot be empty');

    let instance = 0;
    try {
        instance = ImageMagick._api._malloc(array.byteLength);
        ImageMagick._api.HEAPU8.set(array, instance);
        return func(instance);
    }
    finally {
        if (instance !== 0)
            ImageMagick._api._free(instance);
    }
}

/** @internal */
export function _withDoubleArray<TReturnType>(array: number[], func: (instance: number) => TReturnType): TReturnType {
    if (array.length === 0)
        throw new MagickError('The specified array cannot be empty');

    const length = array.length * 8;

    let instance = 0;
    try {
        instance = ImageMagick._api._malloc(length);
        const buffer = new ArrayBuffer(length);
        const doubleArray = new Float64Array(buffer);
        for (let i = 0; i < array.length; i++)
            doubleArray[i] = array[i];
        ImageMagick._api.HEAPU8.set(new Int8Array(buffer), instance);
        return func(instance);
    }
    finally {
        if (instance !== 0)
            ImageMagick._api._free(instance);
    }
}

/** @internal */
export function _withQuantumArray<TReturnType>(array: quantumArray, func: (instance: number) => TReturnType): TReturnType {
    if (array.byteLength === 0)
        throw new MagickError('The specified array cannot be empty');

    let instance = 0;
    try {
        instance = ImageMagick._api._malloc(array.byteLength);
        ImageMagick._api.HEAPU8.set(array, instance);
        return func(instance);
    }
    finally {
        if (instance !== 0)
            ImageMagick._api._free(instance);
    }
}
