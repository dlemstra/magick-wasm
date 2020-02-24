import { ImageMagick } from "./image-magick";
import { MagickFormatInfo } from "./magick-format-info";

export class Magick {
    static get delegates(): string { return ImageMagick._api.UTF8ToString(ImageMagick._api._Magick_Delegates_Get()); }

    static get features(): string { return ImageMagick._api.UTF8ToString(ImageMagick._api._Magick_Features_Get()).slice(0, -1); }

    static get imageMagickVersion(): string { return ImageMagick._api.UTF8ToString(ImageMagick._api._Magick_ImageMagickVersion_Get()); }

    static get supportedFormats(): MagickFormatInfo[] { return MagickFormatInfo.all; }

    static setRandomSeed = (seed: number): void => ImageMagick._api._Magick_SetRandomSeed(seed);
}