export class MagickGeometry {
    private _width: number;
    private _height: number;
    private _x: number;
    private _y: number;

    constructor(width: number, height: number, x = 0, y = 0) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
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