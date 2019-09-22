import { MagickNative } from "../../lib/wasm/magick";

export class Magick
{
    private constructor(private im : MagickNative) {}

    /** @internal */
    static create = (im: MagickNative) => new Magick(im);

    get delegates() { return this.im.UTF8ToString(this.im._Magick_Delegates_Get()); }

    get features() { return this.im.UTF8ToString(this.im._Magick_Features_Get()); }

    get imageMagickVersion() { return this.im.UTF8ToString(this.im._Magick_ImageMagickVersion_Get()); }

    setRandomSeed = (seed: number) => this.im._Magick_SetRandomSeed(seed);
}