// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { IDefines } from '../defines/defines';
import { ImageMagick } from '../image-magick';
import { MagickFormat } from '../magick-format';
import { MagickColor } from '../magick-color';
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
            settings.backgroundColor ._use((ptr) => {
                ImageMagick._api._MagickSettings_BackgroundColor_Set(this._instance, ptr);
            });
        }

        if (settings.fillColor !== undefined)
            this.setOption('fill', settings.fillColor.toString());

        if (settings.font !== undefined) {
            const fileName = `/fonts/${settings.font}`;
            const stats = ImageMagick._api.FS.analyzePath(fileName);
            if (!stats.exists) {
                throw `Unable to find a font with the name '${settings.font}', add it with Magick.addFont.`
            }

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

export class MagickSettings {
    /** @internal */
    _options: Record<string, string> = {};

    /** @internal */
    _fileName?: string;

    /** @internal */
    _quality?: number;

    backgroundColor?: MagickColor;

    fillColor?: MagickColor;

    font?: string;

    fontPointsize?: number;

    format?: MagickFormat;

    strokeColor?: MagickColor;

    getDefine(name: string): string;
    getDefine(format: MagickFormat, name: string): string;
    getDefine(nameOrFormat: MagickFormat | string, name?: string): string {
        if (name !== undefined)
            return this._options[`${nameOrFormat}:${name}`] ?? null;

        return this._options[nameOrFormat] ?? null;
    }

    setDefine(name: string, value: string ): void;
    setDefine(format: MagickFormat, name: string, value: string ): void;
    setDefine(format: MagickFormat, name: string, value: number): void;
    setDefine(format: MagickFormat, name: string, value: boolean): void;
    setDefine(nameOrFormat: MagickFormat | string, nameOrValue: string, value?: string | number | boolean): void {
        if (value === undefined) {
            this._options[nameOrFormat] = nameOrValue;
        } else {
            const key = this.parseDefine(<MagickFormat>nameOrFormat, nameOrValue);
            if (typeof value === 'string')
                this._options[key] = value;
            else if (typeof value === 'number')
                this._options[key] = value.toString();
            else
                this._options[key] = value ? 'true' : 'false';
        }
    }

    setDefines(defines: IDefines): void {
        defines.getDefines().forEach(define => {
            if (define !== undefined)
                this.setDefine(define.format, define.name, define.value);
        });
    }

    /** @internal */
    _clone(): MagickSettings {
        const clone = new MagickSettings();

        clone._fileName = this._fileName;
        clone._quality = this._quality;
        clone.format = this.format;

        for (const option in this._options)
           clone._options[option] = this._options[option]

        return clone;
    }

    /** @internal */
    _use<TReturnType>(func: (settings: NativeMagickSettings) => TReturnType): TReturnType {
        const settings = new NativeMagickSettings(this);
        try {
            return func(settings);
        } finally {
            settings.dispose();
        }
    }

    private parseDefine(format: MagickFormat, name: string): string {
        if (format === MagickFormat.Unknown)
            return name;

        return `${format}:${name}`;
    }
}
