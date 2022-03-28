// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { Magick } from '../magick';
import { MagickSettings } from './magick-settings';
import { NativeInstance } from '../internal/native-instance';
import { _withString } from '../internal/native/string';

/** @internal */
export class NativeMagickSettings extends NativeInstance {
    constructor(settings: MagickSettings) {
        const instance = ImageMagick._api._MagickSettings_Create();
        const disposeMethod = ImageMagick._api._MagickSettings_Dispose;
        super(instance, disposeMethod);

        if (settings._fileName !== undefined) {
            _withString(settings._fileName, ptr => {
                ImageMagick._api._MagickSettings_SetFileName(this._instance, ptr);
            });
        }

        if (settings._quality !== undefined)
            ImageMagick._api._MagickSettings_SetQuality(this._instance, settings._quality);

        if (settings.backgroundColor !== undefined) {
            settings.backgroundColor._use((ptr) => {
                ImageMagick._api._MagickSettings_BackgroundColor_Set(this._instance, ptr);
            });
        }

        if (settings.fillColor !== undefined)
            this.setOption('fill', settings.fillColor.toString());

        if (settings.font !== undefined) {
            const fileName = Magick._getFontFileName(settings.font);

            _withString(fileName, ptr => {
                ImageMagick._api._MagickSettings_Font_Set(this._instance, ptr);
            });
        }

        if (settings.fontPointsize !== undefined)
            ImageMagick._api._MagickSettings_FontPointsize_Set(this._instance, settings.fontPointsize);

        if (settings.format !== undefined) {
            _withString(settings.format, ptr => {
                ImageMagick._api._MagickSettings_Format_Set(this._instance, ptr);
            });
        }

        if (settings.strokeColor !== undefined)
            this.setOption('stroke', settings.strokeColor.toString());

        if (settings.strokeWidth !== undefined)
            this.setOption('strokeWidth', settings.strokeWidth.toString());

        for (const option in settings._options)
            this.setOption(option, settings._options[option]);
    }

    private setOption(option: string, value: string) {
        _withString(option, optionPtr => {
            _withString(value, valuePtr => {
                ImageMagick._api._MagickSettings_SetOption(this._instance, optionPtr, valuePtr);
            });
        });
    }
}
