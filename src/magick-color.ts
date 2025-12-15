/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from './image-magick';
import { MagickError } from './magick-error';
import { Percentage } from './types/percentage';
import { Quantum } from './quantum';
import { _withString } from './internal/native/string';

/**
 * Interface that represents a color.
 */
export interface IMagickColor {
    /** @internal */
    _use<TReturnType>(func: (colorPtr: number) => TReturnType): TReturnType;

    /**
     * Gets or sets the red component value of this color.
     */
    r: number;

    /**
     * Gets or sets the green component value of this color.
     */
    g: number;

    /**
     * Gets or sets the blue component value of this color.
     */
    b: number;

    /**
     * Gets or sets the alpha component value of this color.
     */
    a: number;

    /**
     * Gets or sets the key (black) component value of this color.
     */
    k: number;

    /**
     * Gets a value indicating whether this color is a CMYK color.
     */
    isCmyk: boolean;

    /**
     * Determines whether the specified color is fuzzy equal to the current color.
     * @param other The color to compare this color with.
     * @param fuzz The fuzz factor.
     */
    fuzzyEquals(other: IMagickColor, fuzz: Percentage): boolean;

    /**
     * Converts the value of this instance to a string representation that will not include the alpha channel if it is opaque.
     */
    toShortString(): string;

    /**
     * Converts the value of this instance to a string representation.
     */
    toString(): string;
}

export class MagickColor implements IMagickColor {
    constructor(color?: string);
    constructor(r: number, g: number, b: number);
    constructor(r: number, g: number, b: number, a: number);
    constructor(c: number, m: number, y: number, k: number, a: number);
    constructor(colorOrRed?: string | number, g?: number, b?: number, aOrK?: number, a?: number) {
        if (colorOrRed === undefined)
            return;

        if (typeof colorOrRed === 'string') {
            let instance = 0;
            try {
                instance = ImageMagick._api._MagickColor_Create();
                _withString(colorOrRed, colorPtr => {
                    if (ImageMagick._api._MagickColor_Initialize(instance, colorPtr) === 0)
                        throw new MagickError('invalid color specified');
                    this.initialize(instance);
                });
            } finally {
                ImageMagick._api._free(instance);
            }
        } else {
            this.r = colorOrRed;
            this.g = g ?? 0;
            this.b = b ?? 0;
            if (a === undefined) {
                this.a = aOrK ?? Quantum.max;
            } else {
                this.k = aOrK ?? 0;
                this.a = a;
                this.isCmyk = true;
            }
        }
    }

    r = 0;
    g = 0;
    b = 0;
    a = 0;
    k = 0;
    isCmyk = false;

    /** @internal */
    static _create(colorPtr: number): IMagickColor {
        const color = new MagickColor();
        color.initialize(colorPtr);

        return color;
    }

    fuzzyEquals(other: IMagickColor, fuzz: Percentage): boolean {
        if (other == this)
            return true;

        return this._use(instance => {
            return other._use(otherInstance => {
                return ImageMagick._api._MagickColor_FuzzyEquals(instance, otherInstance, fuzz._toQuantum()) === 1;
            });
        });
    }

    toShortString(): string {
        if (this.a !== Quantum.max)
            return this.toString();

        if (this.isCmyk)
            return `cmyka(${this.r},${this.g},${this.b},${this.k})`;

        return `#${this.toHex(this.r)}${this.toHex(this.g)}${this.toHex(this.b)}`;
    }

    toString(): string {
        if (this.isCmyk)
            return `cmyka(${this.r},${this.g},${this.b},${this.k},${(this.a / Quantum.max).toFixed(4)})`;

        return `#${this.toHex(this.r)}${this.toHex(this.g)}${this.toHex(this.b)}${this.toHex(this.a)}`;
    }

    /** @internal */
    _use<TReturnType>(func: (colorPtr: number) => TReturnType): TReturnType {
        let instance = 0;
        try {
            instance = ImageMagick._api._MagickColor_Create();
            ImageMagick._api._MagickColor_Red_Set(instance, this.r);
            ImageMagick._api._MagickColor_Green_Set(instance, this.g);
            ImageMagick._api._MagickColor_Blue_Set(instance, this.b);
            ImageMagick._api._MagickColor_Alpha_Set(instance, this.a);
            if (this.isCmyk) {
                ImageMagick._api._MagickColor_Black_Set(instance, this.k);
                ImageMagick._api._MagickColor_IsCMYK_Set(instance, 1);
            } else {
                ImageMagick._api._MagickColor_IsCMYK_Set(instance, 0);
            }
            return func(instance);
        } finally {
            ImageMagick._api._MagickColor_Dispose(instance);
        }
    }

    private initialize(instance: number) {
        this.r = ImageMagick._api._MagickColor_Red_Get(instance);
        this.g = ImageMagick._api._MagickColor_Green_Get(instance);
        this.b = ImageMagick._api._MagickColor_Blue_Get(instance);
        this.a = ImageMagick._api._MagickColor_Alpha_Get(instance);
        this.isCmyk = ImageMagick._api._MagickColor_IsCMYK_Get(instance) === 1;
        if (this.isCmyk)
            this.k = ImageMagick._api._MagickColor_Black_Get(instance);
    }

    private toHex(value: number) {
        return value.toString(16).padStart(2, '0');
    }
}
