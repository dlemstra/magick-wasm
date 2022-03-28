// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";

export class DrawableText implements IDrawable {
    _x: number;
    _y: number;
    _value: string;

    constructor(x: number, y: number, value: string) {
        this._x = x;
        this._y = y;
        this._value = value;
    }

    draw(wand: IDrawingWand): void {
        wand.text(this._x, this._y, this._value);
    }
}
