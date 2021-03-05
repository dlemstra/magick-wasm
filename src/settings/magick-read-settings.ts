/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "../image-magick";
import { MagickSettings } from "./magick-settings";
import { NativeMagickSettings } from "./magick-settings";
import { _withString } from "../internal/native/string";
import {IReadDefines} from '../defines/read-defines'

interface IDictionary<T> {
    [key: string]: T;
}

export class MagickReadSettings extends MagickSettings {

    constructor(partialSettings?: Partial<MagickReadSettings>) {
        super();

        Object.assign(this, partialSettings);
    }

    width?: number;

    height?: number;

    defines?: IReadDefines;

    /** @internal */
    static _createFrom(settings: MagickSettings): MagickReadSettings {
        const result = new MagickReadSettings();
        result.format = settings.format;

        return result;
    }

    /** @internal */
    _use<TReturnType>(func: (settings: NativeMagickSettings) => TReturnType): TReturnType {
        const settings = new NativeMagickSettings(this);

        try {

            const size = this.getSize();
            if (size !== '') {
                _withString(size, sizePtr => {
                    ImageMagick._api._MagickSettings_SetSize(settings._instance, sizePtr);
                });
            }

            const options = this.getOptions();
            if (options !== undefined) {
                Object.keys(options).forEach(key => {
                    _withString(key, keyPtr => {
                        _withString(options[key], valuePtr => {
                            ImageMagick._api._MagickSettings_SetOption(settings._instance, keyPtr, valuePtr);
                        });
                    });
                });
            }

            return func(settings);
        } finally {
            settings.dispose();
        }
    }

    private getSize(): string {
        if (this.width !== undefined && this.height !== undefined)
            return `${this.width}x${this.height}`;
        else if (this.width !== undefined)
            return `${this.width}x`;
        else if (this.height !== undefined)
            return `x${this.height}`;
        else
            return "";
    }

    private getOptions(): IDictionary<string> {
        if (this.defines === undefined) {
            return {};
        }

        const options = {} as IDictionary<string>;
        this.defines.defines.forEach(define => {
            const key = this.parseDefine(define.format, define.name);
            options[key] = define.value;
        });

        return options
    }
}
