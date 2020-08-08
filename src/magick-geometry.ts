/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "./image-magick";
import { _withString } from "./native/string";

export class MagickGeometry {
    private _width = 0;
    private _height = 0;
    private _x = 0;
    private _y = 0;

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
            _withString(widthOrValue, (valuePtr)  => {
                ImageMagick._api._MagickGeometry_Initialize(instance, valuePtr);
                this._width = ImageMagick._api._MagickGeometry_Width_Get(instance);
                this._height = ImageMagick._api._MagickGeometry_Height_Get(instance);
                this._x = ImageMagick._api._MagickGeometry_X_Get(instance);
                this._y = ImageMagick._api._MagickGeometry_Y_Get(instance);
            });
        }
    }

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
}