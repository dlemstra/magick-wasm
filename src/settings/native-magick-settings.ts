// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { NativeInstance } from '../internal/native-instance';
import { _withString } from '../internal/native/string';
import { Magick } from '../magick';
import { MagickSettings } from './magick-settings';

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

        if (settings._ping) ImageMagick._api._MagickSettings_SetPing(this._instance, 1);

        if (settings._quality !== undefined) ImageMagick._api._MagickSettings_SetQuality(this._instance, settings._quality);

        if (settings.backgroundColor) {
            settings.backgroundColor._use(ptr => {
                ImageMagick._api._MagickSettings_BackgroundColor_Set(this._instance, ptr);
            });
        }

        if (settings.fillColor) this.setOption('fill', settings.fillColor.toString());

        if (settings.font) {
            const fileName = Magick._getFontFileName(settings.font);

            _withString(fileName, ptr => {
                ImageMagick._api._MagickSettings_Font_Set(this._instance, ptr);
            });
        }

        if (settings.fontPointsize !== undefined) ImageMagick._api._MagickSettings_FontPointsize_Set(this._instance, settings.fontPointsize);

        if (settings.format) {
            _withString(settings.format, ptr => {
                ImageMagick._api._MagickSettings_Format_Set(this._instance, ptr);
            });
        }

        if (settings.strokeColor) this.setOption('stroke', settings.strokeColor.toString());

        if (settings.strokeWidth !== undefined) this.setOption('strokeWidth', settings.strokeWidth.toString());

        Object.entries(settings._options).forEach(
            ([option, value]) => this.setOption(option, value),
        );
    }

    private setOption(option: string, value: string) {
        _withString(option, optionPtr => {
            _withString(value, valuePtr => {
                ImageMagick._api._MagickSettings_SetOption(this._instance, optionPtr, valuePtr);
            });
        });
    }
}
