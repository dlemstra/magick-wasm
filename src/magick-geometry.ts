/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "./image-magick";
import { GeometryFlags } from "./geometry-flags";
import { _withString } from "./native/string";

export class MagickGeometry {
    private _width = 0;
    private _height = 0;
    private _x = 0;
    private _y = 0;
    private _aspectRatio = false;
    private _fillArea = false;
    private _greater = false;
    private _isPercentage = false;
    private _ignoreAspectRatio = false;
    private _less = false;
    private _limitPixels = false;


    constructor(value: string);
    constructor(widthAndHeight: number);
    constructor(width: number, height: number);
    constructor(width: number, height: number, x: number, y: number);
    constructor(widthOrValue: number | string, height?: number, x?: number, y?: number) {
        if (typeof widthOrValue === 'number') {
            this._width = widthOrValue;
            this._height = height ?? widthOrValue;
            this._x = x ?? 0;
            this._y = y ?? 0;
            if (this._width < 0)
                throw new Error('negative width is not allowed');
            if (this._height < 0)
                throw new Error('negative height is not allowed');
        } else {
            const instance = ImageMagick._api._MagickGeometry_Create();
            try {
                _withString(widthOrValue, (valuePtr)  => {
                    const flags = ImageMagick._api._MagickGeometry_Initialize(instance, valuePtr);
                    if (flags === GeometryFlags.NoValue)
                        throw new Error('invalid geometry specified');

                    if (this.hasFlag(flags, GeometryFlags.AspectRatio)) {
                        this.initializeFromAspectRation(instance, widthOrValue);
                    } else {
                        this.initialize(instance, flags);
                    }
                });
            }
            finally {
                ImageMagick._api._MagickGeometry_Dispose(instance);
            }
        }
    }

    get aspectRatio(): boolean { return this._aspectRatio; }

    get fillArea(): boolean { return this._fillArea; }
    set fillArea(value: boolean) { this._fillArea = value; }

    get greater(): boolean { return this._greater; }
    set greater(value: boolean) { this._greater = value; }

    get ignoreAspectRatio(): boolean { return this._ignoreAspectRatio; }
    set ignoreAspectRatio(value: boolean) { this._ignoreAspectRatio = value; }

    get isPercentage(): boolean { return this._isPercentage; }
    set isPercentage(value: boolean) { this._isPercentage = value; }

    get less(): boolean { return this._less; }
    set less(value: boolean) { this._less = value; }

    get limitPixels(): boolean { return this._limitPixels; }
    set limitPixels(value: boolean) { this._limitPixels = value; }

    get height(): number { return this._height; }
    set height(value: number) { this._height = value; }

    get width(): number { return this._width; }
    set width(value: number) { this._width = value; }

    get x(): number { return this._x; }
    set x(value: number) { this._x = value; }

    get y(): number { return this._y; }
    set y(value: number) { this._y = value; }

    toString(): string {
        if (this._aspectRatio)
            return this._width + ":" + this._height;

        let result = '';

        if (this._width > 0)
            result += this._width.toString();

        if (this._height > 0)
            result += 'x' + this._height.toString();
        else
            result += 'x'

        if (this._x != 0 || this._y != 0)
        {
            if (this._x >= 0)
                result += '+';

            result += this._x;

            if (this.y >= 0)
                result += '+';

            result += this.y;
        }

        if (this._fillArea)
            result += '^';

        if (this._greater)
            result += '>';

        if (this._isPercentage)
            result += '%';

        if (this._ignoreAspectRatio)
            result += '!';

        if (this._less)
            result += '<';

        if (this._limitPixels)
            result += '@';

        return result;
    }

    private initialize(instance: number, flags: number) {
        this._width = ImageMagick._api._MagickGeometry_Width_Get(instance);
        this._height = ImageMagick._api._MagickGeometry_Height_Get(instance);
        this._x = ImageMagick._api._MagickGeometry_X_Get(instance);
        this._y = ImageMagick._api._MagickGeometry_Y_Get(instance);
        this._ignoreAspectRatio = this.hasFlag(flags, GeometryFlags.IgnoreAspectRatio);
        this._isPercentage = this.hasFlag(flags, GeometryFlags.PercentValue);
        this._fillArea = this.hasFlag(flags, GeometryFlags.FillArea);
        this._greater = this.hasFlag(flags, GeometryFlags.Greater);
        this._less = this.hasFlag(flags, GeometryFlags.Less);
        this._limitPixels = this.hasFlag(flags, GeometryFlags.LimitPixels);
    }

    private initializeFromAspectRation(instance: number, value: string)
    {
        this._aspectRatio = true;

        const ratio = value.split(':');
        this._width = this.parseNumber(ratio[0]);
        this._height = this.parseNumber(ratio[1]);

        this._x = ImageMagick._api._MagickGeometry_X_Get(instance);
        this._y = ImageMagick._api._MagickGeometry_Y_Get(instance);
    }

    private parseNumber(value: string): number {
        let index = 0;

        while (index < value.length && !this.isNumber(value[index]))
            index++;

        const start = index;
        while (index < value.length && this.isNumber(value[index]))
            index++;

        return parseInt(value.substr(start, index - start));
    }

    private isNumber(character: string): boolean {
        return character >= '0' && character <= '9';
    }

    private hasFlag(flags: number, flag: GeometryFlags) {
        return (flags & flag) === flag;
    }
}