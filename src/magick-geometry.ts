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
        }
        else {
            const instance = ImageMagick._api._MagickGeometry_Create();
            try {
                _withString(widthOrValue, (valuePtr)  => {
                    const flags = ImageMagick._api._MagickGeometry_Initialize(instance, valuePtr);

                    if (this.hasFlag(flags, GeometryFlags.AspectRatio)) {
                        this.initializeFromAspectRation(instance, widthOrValue);
                    } else {
                        this.initialize(instance);
                    }
                });
            }
            finally {
                ImageMagick._api._MagickGeometry_Dispose(instance);
            }
        }
    }

    get aspectRatio(): boolean { return this._aspectRatio; }

    get height(): number { return this._height; }
    set height(value: number) { this._height = value; }

    get width(): number { return this._width; }
    set width(value: number) { this._width = value; }

    get x(): number { return this._x; }
    set x(value: number) { this._x = value; }

    get y(): number { return this._y; }
    set y(value: number) { this._y = value; }

    toString(): string {
        let result = '';

        if (this._width > 0)
            result += this._width.toString();

        if (this._height > 0)
            result += 'x' + this._height.toString();
        else
            result += 'x'

        return result;
    }

    private initialize(instance: number) {
        this._width = ImageMagick._api._MagickGeometry_Width_Get(instance);
        this._height = ImageMagick._api._MagickGeometry_Height_Get(instance);
        this._x = ImageMagick._api._MagickGeometry_X_Get(instance);
        this._y = ImageMagick._api._MagickGeometry_Y_Get(instance);
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