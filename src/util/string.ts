import { nativeApi } from "../image-magick";
import { MagickNative } from '../wasm/magick.js';

/** @internal */
export function withString(str: string, func: (instance: number) => void): void {
    withNativeString(nativeApi(), str, func);
}

/** @internal */
export function withNativeString(native: MagickNative, str: string, func: (instance: number) => void): void {
    const length = native.lengthBytesUTF8(str) + 1;
    const instance = native._malloc(length);
    try {
        native.stringToUTF8(str, instance, length);
        func(instance);
    }
    finally {
        native._free(instance);
    }
}