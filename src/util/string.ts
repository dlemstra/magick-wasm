import { MagickNative } from "../../lib/wasm/magick";

/** @internal */
export function getString(im: MagickNative, offset: number)
{
    return im.UTF8ToString(offset);
}