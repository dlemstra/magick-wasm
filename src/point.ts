// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

export class Point {
    private _x: number;
    private _y: number;

    constructor(xy: number);
    constructor(x: number, y: number);
    constructor(x: number, y?: number) {
        this._x = x;
        this._y = y ?? x;
    }

    get x(): number { return this._x; }
    set x(value: number) { this._x = value; }

    get y(): number { return this._y; }
    set y(value: number) { this._y = value; }
}