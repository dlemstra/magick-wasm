import { ImageMagick } from "../image-magick";
import { MagickNative } from '../wasm/magick.js';

/** @internal */
export function withNativeString<TReturnType>(native: MagickNative, str: string, func: (instance: number) => TReturnType): TReturnType {
    const length = native.lengthBytesUTF8(str) + 1;
    const instance = native._malloc(length);
    try {
        native.stringToUTF8(str, instance, length);
        return func(instance);
    }
    finally {
        native._free(instance);
    }
}

/** @internal */
export function withString<TReturnType>(str: string, func: (instance: number) => TReturnType): TReturnType {
    return withNativeString(ImageMagick.api, str, func);
}