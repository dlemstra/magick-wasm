/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../../image-magick';
import { ImageMagickApi } from '@dlemstra/magick-native';

/** @internal */
export function _createString(instance: number): string | null;
export function _createString(instance: number, defaultValue: string): string;
export function _createString(instance: number, defaultValueOrUndefined?: string): string | null {
    if (instance === 0)
        return defaultValueOrUndefined ?? null;

    return ImageMagick._api.UTF8ToString(instance);
}

/** @internal */
export function _withNativeString<TReturnType>(api: ImageMagickApi, str: string, func: (instance: number) => TReturnType): TReturnType {
    const length = api.lengthBytesUTF8(str) + 1;
    const instance = api._malloc(length);
    try {
        api.stringToUTF8(str, instance, length);
        return func(instance);
    }
    finally {
        api._free(instance);
    }
}

/** @internal */
export function _withString<TReturnType>(str: string, func: (instance: number) => TReturnType): TReturnType {
    return _withNativeString(ImageMagick._api, str, func);
}
