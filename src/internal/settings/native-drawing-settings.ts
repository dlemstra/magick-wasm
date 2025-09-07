/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawingSettings } from './drawing-settings';
import { Exception } from '../exception/exception';
import { ImageMagick } from '../../image-magick';
import { IMagickColor } from '../../magick-color';
import { IMagickImage } from '../../magick-image';
import { Magick } from '../../magick';
import { NativeInstance } from '../../native-instance';
import { _withString } from '../native/string';
import { _withDoubleArray } from '../native/array';

/** @internal */
export class NativeDrawingSettings extends NativeInstance {
    constructor(settings: DrawingSettings) {
        const instance = ImageMagick._api._DrawingSettings_Create();
        const disposeMethod = ImageMagick._api._DrawingSettings_Dispose;
        super(instance, disposeMethod);

        const affine = settings.affine;
        if (affine !== undefined) {
            ImageMagick._api._DrawingSettings_SetAffine(this._instance, affine.scaleX, affine.scaleY, affine.shearX, affine.shearY, affine.translateX, affine.translateY);
        }

        if (settings.borderColor !== undefined) {
            settings.borderColor._use(valuePtr => {
                ImageMagick._api._DrawingSettings_BorderColor_Set(this._instance, valuePtr);
            });
        }

        if (settings.fillColor !== undefined) {
            settings.fillColor._use(valuePtr => {
                ImageMagick._api._DrawingSettings_FillColor_Set(this._instance, valuePtr);
            });
        }

        if (settings.fillRule !== undefined)
            ImageMagick._api._DrawingSettings_FillRule_Set(this._instance, settings.fillRule);

        if (settings.font !== undefined) {
            const fileName = Magick._getFontFileName(settings.font);

            _withString(fileName, ptr => {
                ImageMagick._api._DrawingSettings_Font_Set(this._instance, ptr);
            });
        }

        if (settings.fontPointsize !== undefined)
            ImageMagick._api._DrawingSettings_FontPointsize_Set(this._instance, settings.fontPointsize);

        if (settings.strokeColor !== undefined) {
            settings.strokeColor._use(valuePtr => {
                ImageMagick._api._DrawingSettings_StrokeColor_Set(this._instance, valuePtr);
            });
        }

        const strokeDashArray = settings.strokeDashArray;
        if (strokeDashArray !== undefined) {
            _withDoubleArray(strokeDashArray, strokeDashArrayPtr => {
                ImageMagick._api._DrawingSettings_SetStrokeDashArray(this._instance, strokeDashArrayPtr, strokeDashArray.length);
            });
        }

        if (settings.strokeWidth !== undefined)
            ImageMagick._api._DrawingSettings_StrokeWidth_Set(this._instance, settings.strokeWidth);

        if (settings.textKerning !== undefined)
            ImageMagick._api._DrawingSettings_TextKerning_Set(this._instance, settings.textKerning);

        if (settings.textUnderColor !== undefined) {
            settings.textUnderColor._use(valuePtr => {
                ImageMagick._api._DrawingSettings_TextUnderColor_Set(this._instance, valuePtr);
            });
        }
    }

    setFillColor(color?: IMagickColor) {
        if (color !== undefined) {
            color._use(valuePtr => {
                ImageMagick._api._DrawingSettings_FillColor_Set(this._instance, valuePtr);
            });
        } else {
            ImageMagick._api._DrawingSettings_FillColor_Set(this._instance, 0);
        }
    }

    setFillPattern(image?: IMagickImage) {
        Exception.usePointer(exception => {
            if (image !== undefined)
                ImageMagick._api._DrawingSettings_SetFillPattern(this._instance, image._instance, exception);
            else
                ImageMagick._api._DrawingSettings_SetFillPattern(this._instance, 0, exception);
        });
    }
}
