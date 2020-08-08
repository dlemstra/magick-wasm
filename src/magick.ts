/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "./image-magick";
import { MagickFormatInfo } from "./magick-format-info";
import { _createString } from "./native/string";

export class Magick {
    static get delegates(): string { return _createString(ImageMagick._api._Magick_Delegates_Get(), 'Unknown'); }

    static get features(): string { return _createString(ImageMagick._api._Magick_Features_Get(), ' ').slice(0, -1); }

    static get imageMagickVersion(): string { return _createString(ImageMagick._api._Magick_ImageMagickVersion_Get(), 'Unknown'); }

    static get supportedFormats(): MagickFormatInfo[] { return MagickFormatInfo.all; }

    static setRandomSeed = (seed: number): void => ImageMagick._api._Magick_SetRandomSeed(seed);
}