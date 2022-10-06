// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { NativeInstance } from '../internal/native-instance';
import { _withString } from '../internal/native/string';
import { Magick } from '../magick';
import { DrawingSettings } from './drawing-settings';

/** @internal */
export class NativeDrawingSettings extends NativeInstance {
    constructor(settings: DrawingSettings) {
        const instance = ImageMagick._api._DrawingSettings_Create();
        const disposeMethod = ImageMagick._api._DrawingSettings_Dispose;
        super(instance, disposeMethod);

        if (settings.fillColor) {
            settings.fillColor._use(valuePtr => {
                ImageMagick._api._DrawingSettings_FillColor_Set(this._instance, valuePtr);
            });
        }

        if (settings.font) {
            const fileName = Magick._getFontFileName(settings.font);

            _withString(fileName, ptr => {
                ImageMagick._api._DrawingSettings_Font_Set(this._instance, ptr);
            });
        }

        if (settings.fontPointsize !== undefined) {
            ImageMagick._api._DrawingSettings_FontPointsize_Set(this._instance, settings.fontPointsize);
        }

        if (settings.strokeColor) {
            settings.strokeColor._use(valuePtr => {
                ImageMagick._api._DrawingSettings_StrokeColor_Set(this._instance, valuePtr);
            });
        }

        if (settings.strokeWidth !== undefined) {
            ImageMagick._api._DrawingSettings_StrokeWidth_Set(this._instance, settings.strokeWidth);
        }
    }
}
