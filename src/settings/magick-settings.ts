// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ColorSpace } from '../enums/color-space';
import { ColorType } from '../enums/color-type';
import { CompressionMethod } from '../enums/compression-method';
import { Disposable } from '../internal/disposable';
import { Endian } from '../enums/endian';
import { IDefines } from '../defines/defines';
import { Interlace } from '../enums/interlace';
import { MagickColor } from '../magick-color';
import { MagickFormat } from '../enums/magick-format';
import { NativeMagickSettings } from './native-magick-settings';

/**
 * Class that contains various settings.
 */
export class MagickSettings {
    /** @internal */
    _options: Record<string, string> = {};

    /** @internal */
    _fileName?: string;

    /** @internal */
    _ping = false;

    /** @internal */
    _quality?: number;

    /**
     * Gets or sets a value indicating whether anti-aliasing should be enabled (default true).
     */
    antiAlias?: boolean;

    /**
     * Gets or sets the background color.
     */
    backgroundColor?: MagickColor;

    /**
     * Gets or sets the color space.
     */
    colorSpace?: ColorSpace;

    /**
     * Gets or sets the color type of the image.
     */
    colorType?: ColorType;

    /**
     * Gets or sets the compression method to use.
     */
    compression?: CompressionMethod;

    /**
     * Gets or sets a value indicating whether printing of debug messages from ImageMagick is enabled when a debugger is attached.
     */
    debug?: boolean;

    /**
     * Gets or sets the depth (bits allocated to red/green/blue components).
     */
    depth?: number;

    /**
     * Gets or sets the endianness (little like Intel or big like SPARC) for image formats which support
     * endian-specific options.
     */
    endian?: Endian;

    /**
     * Gets or sets the fill color.
     */
    fillColor?: MagickColor;

    /**
     * Gets or sets the text rendering font.
     */
    font?: string;

    /**
     * Gets or sets the font point size.
     */
    fontPointsize?: number;

    /**
     * Gets or sets the the format of the image.
     */
    format?: MagickFormat;

    /**
     * Gets or sets the interlace method.
     */
    interlace?: Interlace;

    /**
     * Gets or sets the color to use when drawing object outlines.
     */
    strokeColor?: MagickColor;

    /**
     * Gets or sets the stroke width for drawing lines, circles, ellipses, etc.
     */
    strokeWidth?: number;

    /**
     * Gets or sets the text inter-line spacing.
     */
    textInterlineSpacing?: number;

    /**
     * Gets or sets the text inter-character kerning.
     */
    textKerning?: number;

    /**
     * Returns the value of a format-specific option.
     * @param name - The name of the option.
     */
    getDefine(name: string): string;
    /**
     * Returns the value of a format-specific option.
     * @param format - The format to use.
     * @param name - The name of the option.
     */
    getDefine(format: MagickFormat, name: string): string;
    getDefine(nameOrFormat: MagickFormat | string, name?: string): string {
        if (name !== undefined)
            return this._options[`${nameOrFormat}:${name}`] ?? null;

        return this._options[nameOrFormat] ?? null;
    }

    /**
     * Sets a format-specific option.
     * @param name - The name of the define.
     * @param value - The value of the define.
     */
    setDefine(name: string, value: string): void;
    /**
     * Sets a format-specific option.
     * @param format - The format to set the define for.
     * @param name - The name of the define.
     * @param value - The value of the define.
     */
    setDefine(format: MagickFormat, name: string, value: string): void;
    /**
     * Sets a format-specific option.
     * @param format - The format to set the define for.
     * @param name - The name of the define.
     * @param value - The value of the define.
     */
    setDefine(format: MagickFormat, name: string, value: number): void;
    /**
     * Sets a format-specific option.
     * @param format - The format to set the define for.
     * @param name - The name of the define.
     * @param value - The value of the define.
     */
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

    /**
     * Sets format-specific options with the specified defines.
     */
    setDefines(defines: IDefines): void {
        defines.getDefines().forEach(define => {
            if (define !== undefined)
                this.setDefine(define.format, define.name, define.value);
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
        return Disposable._disposeAfterExecution(settings, func);
    }

    private parseDefine(format: MagickFormat, name: string): string {
        if (format === MagickFormat.Unknown)
            return name;

        return `${format}:${name}`;
    }
}
