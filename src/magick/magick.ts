import { MagickNative } from "../wasm/magick";
import { getString } from "../util/string";

export class Magick
{
    constructor(private im : MagickNative) { }

    get imageMagickVersion()
    {
        return getString(this.im, this.im._Magick_ImageMagickVersion_Get());
    } 
}