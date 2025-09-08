/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '../enums/color-space';
import { ColorType } from '../enums/color-type';
import { CompressionMethod } from '../enums/compression-method';
import { Density } from '../types/density';
import { Disposable } from '../internal/disposable';
import { DrawingSettings } from '../internal/settings/drawing-settings';
import { Endian } from '../enums/endian';
import { FillRule } from '../enums/fill-rule';
import { Gravity } from '../enums/gravity';
import { IDefines } from '../defines/defines';
import { IDrawableAffine } from '../drawing/drawable-affine';
import { Interlace } from '../enums/interlace';
import { IMagickColor } from '../magick-color';
import { IMagickGeometry } from '../types/magick-geometry';
import { MagickFormat } from '../enums/magick-format';
import { NativeMagickSettings } from './native-magick-settings';
import { _getGravityName } from '../enums/gravity';

/**
 * Class that contains various settings.
 */
export class MagickSettings {
    /** @internal */
    _colorFuzz?: number;

    /** @internal */
    _drawing: DrawingSettings = new DrawingSettings();

    /** @internal */
    _fileName?: string;

    /** @internal */
    _onArtifact?: (key: string, value: string | undefined) => void;

    /** @internal */
    _options: Record<string, string> = {};

    /** @internal */
    _ping = false;

    /** @internal */
    _quality?: number;

    /**
     * Gets or sets the affine to use when annotating with text or drawing.
     */
    get affine(): IDrawableAffine | undefined {
        return this._drawing.affine;
    }
    set affine(value: IDrawableAffine | undefined) {
        this._drawing.affine = value;
    }

    /**
     * Gets or sets a value indicating whether anti-aliasing should be enabled (default true).
     */
    antiAlias?: boolean;

    /**
     * Gets or sets the background color.
     */
    backgroundColor?: IMagickColor;

    /**
     * Gets or sets the border color.
     */
    get borderColor(): IMagickColor | undefined {
        return this._drawing.borderColor;
    }
    set borderColor(value: IMagickColor | undefined) {
        this._drawing.borderColor = value;
    }

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
     * Gets or sets the vertical and horizontal resolution in pixels.
     */
    density?: Density;

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
    get fillColor(): IMagickColor | undefined {
        return this._drawing.fillColor;
    }
    set fillColor(value: IMagickColor | undefined) {
        this.setDefineAndArtifact('fill', value?.toString());
        this._drawing.fillColor = value;
    }

    /**
     * Gets or sets the rule to use when filling drawn objects.
     */
    get fillRule(): FillRule {
        return this._drawing.fillRule ?? FillRule.Undefined;
    }
    set fillRule(value: FillRule) {
        this._drawing.fillRule = value;
    }

    /**
     * Gets or sets the text rendering font.
     */
    get font(): string | undefined {
        return this._drawing.font;
    }
    set font(value: string | undefined) {
        this._drawing.font = value;
    }

    /**
     * Gets or sets the font point size.
     */
    get fontPointsize(): number | undefined {
        return this._drawing.fontPointsize;
    }
    set fontPointsize(value: number | undefined) {
        this._drawing.fontPointsize = value;
    }

    /**
     * Gets or sets the the format of the image.
     */
    format?: MagickFormat;

    /**
     * Gets or sets the interlace method.
     */
    interlace?: Interlace;

    /**
     * Gets or sets the preferred size and location of an image canvas.
     */
    page?: IMagickGeometry;

    /**
     * Gets or sets the color to use when drawing object outlines.
     */
    get strokeColor(): IMagickColor | undefined {
        return this._drawing.strokeColor;
    }
    set strokeColor(value: IMagickColor | undefined) {
        this._drawing.strokeColor = value;
    }

    /**
     * Gets or sets the pattern of dashes and gaps used to stroke paths. This represents a
     * zero-terminated array of numbers that specify the lengths of alternating dashes and gaps
     * in pixels. If a zero value is not found it will be added. If an odd number of values is
     * provided, then the list of values is repeated to yield an even number of values.
     */
    get strokeDashArray(): number[] | undefined {
        return this._drawing.strokeDashArray;
    }
    set strokeDashArray(value: number[] | undefined) {
        this._drawing.strokeDashArray = value;
    }

    /**
     * Gets or sets the distance into the dash pattern to start the dash (default 0) while
     * drawing using a dash pattern.
    */
    get strokeDashOffset(): number | undefined {
        return this._drawing.strokeDashOffset;
    }
    set strokeDashOffset(value: number | undefined) {
        this._drawing.strokeDashOffset = value;
    }

    /**
     * Gets or sets the stroke width for drawing lines, circles, ellipses, etc.
     */
    get strokeWidth(): number | undefined {
        return this._drawing.strokeWidth;
    }
    set strokeWidth(value: number | undefined) {
        this.setDefineAndArtifact('stroke', value?.toString());
        this._drawing.strokeWidth = value;
    }

    /**
     * Gets or sets a value indicating whether text anti-aliasing should be enabled (default true).
     */
    get textAntiAlias(): boolean | undefined {
        return this._drawing.textAntiAlias;
    }
    set textAntiAlias(value: boolean | undefined) {
        this._drawing.textAntiAlias = value;
    }

    /**
     * Gets or sets the text inter-line spacing.
     */
    textInterlineSpacing?: number;

    /**
     * Gets or sets the text inter-character kerning.
     */
    get textKerning(): number | undefined {
        return this._drawing.textKerning;
    }
    set textKerning(value: number | undefined) {
        this.setDefineAndArtifact('kerning', value?.toString());
        this._drawing.textKerning = value;
    }

    /**
     * Gets or sets the text annotation gravity.
     */
    get textGravity(): Gravity | undefined {
        return this._drawing.textGravity;
    }
    set textGravity(value: Gravity | undefined) {
        this.setDefineAndArtifact('gravity', _getGravityName(value));
        this._drawing.textGravity = value;
    }

    /**
     * Gets or sets the text undercolor box.
     */
    get textUnderColor(): IMagickColor | undefined {
        return this._drawing.textUnderColor;
    }
    set textUnderColor(value: IMagickColor | undefined) {
        this._drawing.textUnderColor = value;
    }

    /**
     * Returns the value of a format-specific option.
     * @param name The name of the option.
     */
    getDefine(name: string): string | null;
    /**
     * Returns the value of a format-specific option.
     * @param format The format to use.
     * @param name The name of the option.
     */
    getDefine(format: MagickFormat, name: string): string | null;
    getDefine(nameOrFormat: MagickFormat | string, name?: string): string | null {
        if (name !== undefined)
            return this._options[`${nameOrFormat}:${name}`] ?? null;

        return this._options[nameOrFormat] ?? null;
    }

    /**
     * Sets a format-specific option.
     * @param name The name of the define.
     */
    removeDefine(name: string): void;
    /**
     * Sets a format-specific option.
     * @param format The format to set the define for.
     * @param name The name of the define.
     */
    removeDefine(format: MagickFormat, name: string): void;
    removeDefine(nameOrFormat: MagickFormat | string, nameOrUndefined?: string): void {
        if (nameOrUndefined === undefined) {
            delete this._options[nameOrFormat];
        } else {
            const key = this.parseDefine(<MagickFormat>nameOrFormat, nameOrUndefined);
            delete this._options[key];
        }
    }

    /**
     * Sets a format-specific option.
     * @param name The name of the define.
     * @param value The value of the define.
     */
    setDefine(name: string, value: string): void;
    /**
     * Sets a format-specific option.
     * @param format The format to set the define for.
     * @param name The name of the define.
     * @param value The value of the define.
     */
    setDefine(format: MagickFormat, name: string, value: string): void;
    /**
     * Sets a format-specific option.
     * @param format The format to set the define for.
     * @param name The name of the define.
     * @param value The value of the define.
     */
    setDefine(format: MagickFormat, name: string, value: number): void;
    /**
     * Sets a format-specific option.
     * @param format The format to set the define for.
     * @param name The name of the define.
     * @param value The value of the define.
     */
    setDefine(format: MagickFormat, name: string, value: boolean): void;
    setDefine(nameOrFormat: MagickFormat | string, nameOrValue: string, valueOrUndefined?: string | number | boolean): void {
        if (valueOrUndefined === undefined) {
            this._options[nameOrFormat] = nameOrValue;
        } else {
            const key = this.parseDefine(<MagickFormat>nameOrFormat, nameOrValue);
            if (typeof valueOrUndefined === 'string')
                this._options[key] = valueOrUndefined;
            else if (typeof valueOrUndefined === 'number')
                this._options[key] = valueOrUndefined.toString();
            else
                this._options[key] = valueOrUndefined ? 'true' : 'false';
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

    private setDefineAndArtifact(name: string, value: string | undefined): void {
        if (value === undefined)
            this.removeDefine(name);
        else
            this.setDefine(name, value);

        if (this._onArtifact !== undefined)
            this._onArtifact(name, value);
    }
}
