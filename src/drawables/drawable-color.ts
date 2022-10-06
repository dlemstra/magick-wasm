// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { PaintMethod } from '../paint-method';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

export class DrawableColor implements IDrawable {
    private readonly _x: number;

    private readonly _y: number;

    private readonly _paintMethod: PaintMethod;

    constructor(x: number, y: number, paintMethod: PaintMethod) {
        this._x = x;
        this._y = y;
        this._paintMethod = paintMethod;
    }

    draw(wand: IDrawingWand): void {
        wand.color(this._x, this._y, this._paintMethod);
    }
}
