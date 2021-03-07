// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { IDefines } from '../defines/defines';
import { ImageMagick } from '../image-magick';
import { MagickFormat } from '../magick-format';
import { NativeInstance } from '../internal/native-instance';
import { _withString } from '../internal/native/string';

/** @internal */
export class NativeMagickSettings extends NativeInstance {
    constructor(settings: MagickSettings) {
        const instance = ImageMagick._api._MagickSettings_Create();
        const disposeMethod = ImageMagick._api._MagickSettings_Dispose;
        super(instance, disposeMethod);

        if (settings._fileName !== undefined) {
            _withString(settings._fileName, filenamePtr => {
                ImageMagick._api._MagickSettings_SetFileName(this._instance, filenamePtr);
            });
        }

        if (settings._quality !== undefined) {
            ImageMagick._api._MagickSettings_SetQuality(this._instance, settings._quality);
        }

        if (settings.format !== undefined) {
            _withString(settings.format, formatPtr => {
                ImageMagick._api._MagickSettings_Format_Set(this._instance, formatPtr);
            });
        }

        for (const option in settings._options) {
            _withString(option, optionPtr => {
                _withString(settings._options[option], valuePtr => {
                    ImageMagick._api._MagickSettings_SetOption(this._instance, optionPtr, valuePtr);
                });
            });
        }
    }
}

export class MagickSettings {
    /** @internal */
    _options: Record<string, string> = {};

    /** @internal */
    _fileName?: string;

    /** @internal */
    _quality?: number;

    format?: MagickFormat;

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