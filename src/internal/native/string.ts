/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../../image-magick';
import { ImageMagickApi } from '@dlemstra/magick-native';
import { NativePointer } from '@dlemstra/magick-native';

/** @internal */
export function _createString(instance: NativePointer): string | null;
export function _createString(instance: NativePointer, defaultValue: string): string;
export function _createString(instance: NativePointer, defaultValueOrUndefined?: string): string | null {
    if (instance === ImageMagick._api._NullPointer)
        return defaultValueOrUndefined ?? null;

    return _createRequiredString(instance);
}

/** @internal */
export function _createRequiredString(instance: NativePointer): string {
    return ImageMagick._api.UTF8ToString(Number(instance));
}


/** @internal */
export function _createStringAndRelinquish(api: ImageMagickApi, instance: NativePointer): string | null {
    const result = _createString(instance);

    api._MagickMemory_Relinquish(instance);

    return result;
}

/** @internal */
export function _withNativeString<TReturnType>(api: ImageMagickApi, str: string, func: (instance: NativePointer) => TReturnType): TReturnType {
    const length = api.lengthBytesUTF8(str) + 1;
    const instance = api._malloc(length);
    try {
        api.stringToUTF8(str, instance, length);
        return func(api._CastToSize(instance));
    }
    finally {
        api._free(instance);
    }
}

/** @internal */
export function _withString<TReturnType>(str: string | null, func: (instance: NativePointer) => TReturnType): TReturnType {
    if (str === null)
        return func(ImageMagick._api._NullPointer);

    return _withNativeString(ImageMagick._api, str, func);
}
