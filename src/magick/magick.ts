import { MagickNative } from "../../lib/wasm/magick";

export class Magick
{
    private constructor(private im : MagickNative) {}

    /** @internal */
    static create = (im: MagickNative) => new Magick(im);

    get imageMagickVersion() { return this.im.UTF8ToString(this.im._Magick_ImageMagickVersion_Get()); }
}