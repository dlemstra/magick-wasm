/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import {ImageMagick} from '../image-magick'
import {MagickFormat} from '../magick-format'
import {NativeInstance} from '../internal/native-instance'
import {_withString} from '../internal/native/string'
import {IDefines} from '../defines/defines'

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

        if (settings._options !== undefined) {
            Object.keys(settings._options).forEach(key => {
                _withString(key, keyPtr => {
                    _withString(settings._options[key], valuePtr => {
                        ImageMagick._api._MagickSettings_SetOption(this._instance, keyPtr, valuePtr);
                    });
                });
            });
        }
    }
}

interface IDictionary<T> {
    [key: string]: T;
}

export class MagickSettings {
    /** @internal */
    _fileName?: string;

    /** @internal */
    _quality?: number;

    _options: IDictionary<string> = {}

    format?: MagickFormat;

    setDefines(defines: IDefines): void {
        defines.defines.forEach(define => {
            if (define !== undefined) {
                this.setDefine(this.parseDefine(define.format, define.name), define.value);
            }
        });
    }

    setDefine(name: string, value: string) {
        this._setOption(name, value);
    }

    parseDefine(format: MagickFormat, name: string): string {
        if (format === MagickFormat.Unknown) {
            return name;
        }

        return `${format}:${name}`;
    }

    _setOption(key: string, value: string) {
        this._options[key] = value;
    }

    /** @internal */
    _clone(): MagickSettings {
        const clone = new MagickSettings();

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