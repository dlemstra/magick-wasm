// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";

export class DrawableRectangle implements IDrawable {
    private readonly _upperLeftX: number;
    private readonly _upperLeftY: number;
    private readonly _lowerRightX: number;
    private readonly _lowerRightY: number;

    constructor(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number) {
        this._upperLeftX = upperLeftX;
        this._upperLeftY = upperLeftY;
        this._lowerRightX = lowerRightX;
        this._lowerRightY = lowerRightY;
    }

    draw(wand: IDrawingWand): void {
        wand.rectangle(this._upperLeftX, this._upperLeftY, this._lowerRightX, this._lowerRightY);
    }
}
