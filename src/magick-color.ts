// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { _withString } from './internal/native/string';
import { MagickError } from './magick-error';
import { Quantum } from './quantum';

export class MagickColor {
    private _isCmyk = false;

    /* eslint-disable @typescript-eslint/member-ordering */
    private _r = 0;

    private _g = 0;

    private _b = 0;

    private _a = 0;

    private _k = 0;
    /* eslint-enable @typescript-eslint/member-ordering */

    constructor(color?: string);
    constructor(r: number, g: number, b: number);
    constructor(r: number, g: number, b: number, a: number);
    constructor(c: number, m: number, y: number, k: number, a: number);
    constructor(colorOrRed?: string | number, g?: number, b?: number, aOrK?: number, a?: number) {
        if (colorOrRed === undefined) return;

        if (typeof colorOrRed === 'string') {
            let instance = 0;
            try {
                instance = ImageMagick._api._MagickColor_Create();
                _withString(colorOrRed, colorPtr => {
                    if (ImageMagick._api._MagickColor_Initialize(instance, colorPtr) === 0) throw new MagickError('invalid color specified');
                    this.initialize(instance);
                });
            } finally {
                ImageMagick._api._free(instance);
            }
        } else {
            this._r = colorOrRed;
            this._g = g ?? 0;
            this._b = b ?? 0;
            if (a === undefined) {
                this._a = aOrK ?? Quantum.max;
            } else {
                this._k = aOrK ?? 0;
                this._a = a;
                this._isCmyk = true;
            }
        }
    }

    get r(): number { return this._r; }

    set r(value: number) { this._r = value; }

    get g(): number { return this._g; }

    set g(value: number) { this._g = value; }

    get b(): number { return this._b; }

    set b(value: number) { this._b = value; }

    get a(): number { return this._a; }

    set a(value: number) { this._a = value; }

    get k(): number { return this._k; }

    set k(value: number) { this._k = value; }

    get isCmyk(): boolean { return this._isCmyk; }

    toShortString(): string {
        if (this._a !== Quantum.max) return this.toString();

        if (this.isCmyk) return this.toCmyk(false);

        return this.toHex(false);
    }

    toString(): string {
        if (this.isCmyk) return this.toCmyk(true);

        return this.toHex(true);
    }

    /** @internal */
    _use(func: (colorPtr: number) => void): void {
        let instance = 0;
        try {
            instance = ImageMagick._api._MagickColor_Create();
            ImageMagick._api._MagickColor_Red_Set(instance, this._r);
            ImageMagick._api._MagickColor_Green_Set(instance, this._g);
            ImageMagick._api._MagickColor_Blue_Set(instance, this._b);
            ImageMagick._api._MagickColor_Alpha_Set(instance, this._a);
            ImageMagick._api._MagickColor_IsCMYK_Set(instance, this._isCmyk ? 1 : 0);
            func(instance);
        } finally {
            ImageMagick._api._free(instance);
        }
    }

    private initialize(instance: number) {
        this._r = ImageMagick._api._MagickColor_Red_Get(instance);
        this._g = ImageMagick._api._MagickColor_Green_Get(instance);
        this._b = ImageMagick._api._MagickColor_Blue_Get(instance);
        this._a = ImageMagick._api._MagickColor_Alpha_Get(instance);
        this._isCmyk = ImageMagick._api._MagickColor_IsCMYK_Get(instance) === 1;
    }

    private toCmyk(withAlpha: boolean) {
        const alpha = (this._a / Quantum.max).toFixed(4);

        return `cmyka(${this._r},${this._g},${this._b},${this._k}${withAlpha ? `,${alpha}` : ''})`;
    }

    private toHex(withAlpha: boolean) {
        return `#${MagickColor.floatToHex(this._r)}${MagickColor.floatToHex(this._g)}${MagickColor.floatToHex(this._b)}${withAlpha ? MagickColor.floatToHex(this._a) : ''}`;
    }

    /** @internal */
    static _create(colorPtr: number): MagickColor {
        const color = new MagickColor();
        color.initialize(colorPtr);
        return color;
    }

    private static floatToHex(value: number) {
        return value.toString(16).padStart(2, '0');
    }
}
