// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { NativeInstance } from '../native-instance';
import { _withString } from '../internal/native/string';
import { QuantizeSettings } from './quantize-settings';
import { DitherMethod } from '../enums/dither-method';

/** @internal */
export class NativeQuantizeSettings extends NativeInstance {
    constructor(settings: QuantizeSettings) {
        const instance = ImageMagick._api._QuantizeSettings_Create();
        const disposeMethod = ImageMagick._api._QuantizeSettings_Dispose;
        super(instance, disposeMethod);

        ImageMagick._api._QuantizeSettings_SetColors(this._instance, settings.colors);
        ImageMagick._api._QuantizeSettings_SetColorSpace(this._instance, settings.colorSpace);
        ImageMagick._api._QuantizeSettings_SetDitherMethod(this._instance, settings.ditherMethod ?? DitherMethod.No);
        ImageMagick._api._QuantizeSettings_SetMeasureErrors(this._instance, settings.measureErrors ? 1 : 0);
        ImageMagick._api._QuantizeSettings_SetTreeDepth(this._instance, settings.treeDepth);
    }
}
