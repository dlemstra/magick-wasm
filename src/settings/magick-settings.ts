// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDefines } from '../defines/defines';
import { MagickColor } from '../magick-color';
import { MagickFormat } from '../magick-format';
import { NativeMagickSettings } from './native-magick-settings';

export class MagickSettings {
    /** @internal */
    _options: Record<string, string> = {};

    /** @internal */
    _fileName?: string;

    /** @internal */
    _ping = false;

    /** @internal */
    _quality?: number;

    backgroundColor?: MagickColor;

    fillColor?: MagickColor;

    font?: string;

    fontPointsize?: number;

    format?: MagickFormat;

    strokeColor?: MagickColor;

    strokeWidth?: number;

    getDefine(name: string): string;
    getDefine(format: MagickFormat, name: string): string;
    getDefine(nameOrFormat: MagickFormat | string, name?: string): string {
        if (name !== undefined) return this._options[`${nameOrFormat}:${name}`] ?? null;

        return this._options[nameOrFormat] ?? null;
    }

    setDefine(name: string, value: string): void;
    setDefine(format: MagickFormat, name: string, value: string): void;
    setDefine(format: MagickFormat, name: string, value: number): void;
    setDefine(format: MagickFormat, name: string, value: boolean): void;
    setDefine(nameOrFormat: MagickFormat | string, nameOrValue: string, value?: string | number | boolean): void {
        if (value === undefined) {
            this._options[nameOrFormat] = nameOrValue;
        } else {
            const key = this.parseDefine(<MagickFormat>nameOrFormat, nameOrValue);
            if (typeof value === 'string') this._options[key] = value;
            else if (typeof value === 'number') this._options[key] = value.toString();
            else this._options[key] = value ? 'true' : 'false';
        }
    }

    setDefines(defines: IDefines): void {
        defines.getDefines().forEach(define => {
            if (define !== undefined) this.setDefine(define.format, define.name, define.value);
        });
    }

    /** @internal */
    _clone(): MagickSettings {
        const clone = new MagickSettings();
        Object.assign(clone, this);
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
        if (format === MagickFormat.Unknown) return name;

        return `${format}:${name}`;
    }
}
