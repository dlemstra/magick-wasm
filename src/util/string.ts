import { MagickNative } from "../wasm/magick";

/** @internal */
export function getString(native: MagickNative, offset: number)
{
    let result = '';
    let i = offset;
    while (native.HEAP8[i] != 0)
    {
        result += String.fromCharCode(native.HEAP8[i++]);
    }

    return result;
}