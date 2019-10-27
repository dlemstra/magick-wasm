import { MagickNative } from "../../lib/wasm/magick";

/** @internal */
export function withString(im: MagickNative, str: string, func: (instance: number) => void): void {
    const length = im.lengthBytesUTF8(str) + 1;
    const instance = im._malloc(length);
    try {
        im.stringToUTF8(str, instance, length);
        func(instance);
    }
    finally {
        im._free(instance);
    }
}