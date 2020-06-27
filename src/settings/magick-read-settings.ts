/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "../image-magick";
import { MagickSettings } from "./magick-settings";
import { NativeMagickSettings } from "./magick-settings";
import { withString } from "../util/string";

export class MagickReadSettings extends MagickSettings {

    width?: number;

    height?: number;

    /** @internal */
    static _createFrom(settings: MagickSettings): MagickReadSettings {
        const result = new MagickReadSettings();
        result.format = settings.format;

        return result;
    }

    /** @internal */
    _use<TReturnType>(func: (settings: NativeMagickSettings) => TReturnType): TReturnType {
        const settings = new NativeMagickSettings(this);

        try {

            const size = this.getSize();
            if (size !== '') {
                withString(size, (sizePtr) => {
                    ImageMagick._api._MagickSettings_SetSize(settings._instance, sizePtr);
                });
            }

            return func(settings);
        } finally {
            settings.dispose();
        }
    }

    private getSize(): string {
        if (this.width !== undefined && this.height !== undefined)
            return `${this.width}x${this.height}`;
        else if (this.width !== undefined)
            return `${this.width}x`;
        else if (this.height !== undefined)
            return `x${this.height}`;
        else
            return "";
    }
}