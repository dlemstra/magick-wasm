/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../image-magick';
import { Magick } from '../magick';
import { MagickSettings } from './magick-settings';
import { NativeInstance } from '../native-instance';
import { _withString } from '../internal/native/string';

/** @internal */
export class NativeMagickSettings extends NativeInstance {
    constructor(settings: MagickSettings) {
        const instance = ImageMagick._api._MagickSettings_Create();
        const disposeMethod = ImageMagick._api._MagickSettings_Dispose;
        super(instance, disposeMethod);

        if (settings._colorFuzz !== undefined)
            ImageMagick._api._MagickSettings_SetColorFuzz(this._instance, settings._colorFuzz);

        if (settings._fileName !== undefined) {
            _withString(settings._fileName, ptr => {
                ImageMagick._api._MagickSettings_SetFileName(this._instance, ptr);
            });
        }

        if (settings._ping)
            ImageMagick._api._MagickSettings_SetPing(this._instance, 1);

        if (settings._quality !== undefined)
            ImageMagick._api._MagickSettings_SetQuality(this._instance, settings._quality);

        if (settings.antiAlias !== undefined)
            ImageMagick._api._MagickSettings_AntiAlias_Set(this._instance, settings.antiAlias ? 1 : 0);

        if (settings.backgroundColor !== undefined) {
            settings.backgroundColor._use((ptr) => {
                ImageMagick._api._MagickSettings_BackgroundColor_Set(this._instance, ptr);
            });
        }

        if (settings.colorSpace !== undefined)
            ImageMagick._api._MagickSettings_ColorSpace_Set(this._instance, settings.colorSpace);

        if (settings.colorType !== undefined)
            ImageMagick._api._MagickSettings_ColorType_Set(this._instance, settings.colorType);

        if (settings.compression !== undefined)
            ImageMagick._api._MagickSettings_Compression_Set(this._instance, settings.compression);

        if (settings.debug !== undefined)
            ImageMagick._api._MagickSettings_Debug_Set(this._instance, settings.debug ? 1 : 0);

        if (settings.density !== undefined) {
            const density = settings.density.toString();
            _withString(density, ptr => {
                ImageMagick._api._MagickSettings_Density_Set(this._instance, ptr);
            });
        }

        if (settings.depth !== undefined)
            ImageMagick._api._MagickSettings_Depth_Set(this._instance, settings.depth);

        if (settings.endian !== undefined)
            ImageMagick._api._MagickSettings_Endian_Set(this._instance, settings.endian);

        if (settings.fillColor !== undefined)
            this.setOption('fill', settings.fillColor.toString());

        if (settings.font !== undefined) {
            const fileName = Magick._getFontFileName(settings.font);

            _withString(fileName, ptr => {
                ImageMagick._api._MagickSettings_SetFont(this._instance, ptr);
            });
        }

        if (settings.fontPointsize !== undefined)
            ImageMagick._api._MagickSettings_FontPointsize_Set(this._instance, settings.fontPointsize);

        if (settings.format !== undefined) {
            _withString(settings.format, ptr => {
                ImageMagick._api._MagickSettings_Format_Set(this._instance, ptr);
            });
        }

        if (settings.interlace !== undefined)
            ImageMagick._api._MagickSettings_Interlace_Set(this._instance, settings.interlace);

        if (settings.strokeColor !== undefined)
            this.setOption('stroke', settings.strokeColor.toString());

        if (settings.strokeWidth !== undefined)
            this.setOption('strokeWidth', settings.strokeWidth.toString());

        if (settings.textInterlineSpacing !== undefined)
            this.setOption('interline-spacing', settings.textInterlineSpacing.toString());

        if (settings.textKerning !== undefined)
            this.setOption('kerning', settings.textKerning.toString());

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
