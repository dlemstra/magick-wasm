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

    getDefine(name: string): string {
        return this._options[name] ?? null;
    }

    setDefine(name: string, value: string ): void;
    setDefine(name: string, value: boolean): void;
    setDefine(name: string, value: string | boolean): void {
        if (typeof value === 'string')
            this._options[name] = value;
        else
            this._options[name] = value ? 'true' : 'false';
    }

    setDefines(defines: IDefines): void {
        defines.getDefines().forEach(define => {
            if (define !== undefined)
                this.setDefine(this.parseDefine(define.format, define.name), define.value);
        });
    }

    parseDefine(format: MagickFormat, name: string): string {
        if (format === MagickFormat.Unknown) {
            return name;
        }

        return `${format}:${name}`;
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
}