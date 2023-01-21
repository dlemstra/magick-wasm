// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { Magick } from '../magick';
import { MontageSettings } from './montage-settings';
import { NativeInstance } from '../native-instance';
import { _withString } from '../internal/native/string';

/** @internal */
export class NativeMontageSettings extends NativeInstance {
    constructor(settings: MontageSettings) {
        const instance = ImageMagick._api._MontageSettings_Create();
        const disposeMethod = ImageMagick._api._MontageSettings_Dispose;
        super(instance, disposeMethod);

        if (settings.backgroundColor !== undefined) {
            settings.backgroundColor._use(valuePtr => {
                ImageMagick._api._MontageSettings_SetBackgroundColor(this._instance, valuePtr);
            });
        }

        if (settings.borderColor !== undefined) {
            settings.borderColor._use(valuePtr => {
                ImageMagick._api._MontageSettings_SetBorderColor(this._instance, valuePtr);
            });
        }

        if (settings.borderWidth !== undefined)
            ImageMagick._api._MontageSettings_SetBorderWidth(this._instance, settings.borderWidth);

        if (settings.fillColor !== undefined) {
            settings.fillColor._use(valuePtr => {
                ImageMagick._api._MontageSettings_SetFillColor(this._instance, valuePtr);
            });
        }

        if (settings.font !== undefined) {
            const fileName = Magick._getFontFileName(settings.font);

            _withString(fileName, ptr => {
                ImageMagick._api._MontageSettings_SetFont(this._instance, ptr);
            });
        }

        if (settings.fontPointsize !== undefined)
            ImageMagick._api._MontageSettings_SetFontPointsize(this._instance, settings.fontPointsize);

        if (settings.frameGeometry !== undefined) {
            _withString(settings.frameGeometry.toString(), geometryPtr => {
                ImageMagick._api._MontageSettings_SetFrameGeometry(this._instance, geometryPtr);
            });
        }

        if (settings.geometry !== undefined) {
            _withString(settings.geometry.toString(), geometryPtr => {
                ImageMagick._api._MontageSettings_SetGeometry(this._instance, geometryPtr);
            });
        }

        if (settings.gravity !== undefined)
            ImageMagick._api._MontageSettings_SetGravity(this._instance, settings.gravity);

        if (settings.shadow !== undefined)
            ImageMagick._api._MontageSettings_SetShadow(this._instance, settings.shadow ? 1 : 0);

        if (settings.strokeColor !== undefined) {
            settings.strokeColor._use(valuePtr => {
                ImageMagick._api._MontageSettings_SetStrokeColor(this._instance, valuePtr);
            });
        }

        if (settings.textureFileName !== undefined) {
            _withString(settings.textureFileName, ptr => {
                ImageMagick._api._MontageSettings_SetTextureFileName(this._instance, ptr);
            });
        }

        if (settings.tileGeometry !== undefined) {
            _withString(settings.tileGeometry.toString(), geometryPtr => {
                ImageMagick._api._MontageSettings_SetTileGeometry(this._instance, geometryPtr);
            });
        }

        if (settings.title !== undefined) {
            _withString(settings.title, ptr => {
                ImageMagick._api._MontageSettings_SetTitle(this._instance, ptr);
            });
        }
    }
}
