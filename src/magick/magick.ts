import { MagickNative } from "../../lib/wasm/magick";
import { getString } from "../util/string";

export class Magick
{
    private constructor(private im : MagickNative) {}

    /** @internal */
    static create = (im: MagickNative) => new Magick(im);

    get imageMagickVersion() { return getString(this.im, this.im._Magick_ImageMagickVersion_Get()); }
}