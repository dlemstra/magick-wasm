// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Draws a rounted rectangle given two coordinates, x & y corner radiuses and using the current
 * stroke, stroke width, and fill settings.
 */
export class DrawableRoundRectangle implements IDrawable {
    private readonly _upperLeftX: number;
    private readonly _upperLeftY: number;
    private readonly _lowerRightX: number;
    private readonly _lowerRightY: number;
    private readonly _cornerWidth: number;
    private readonly _cornerHeight: number;

    constructor(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number) {
        this._upperLeftX = upperLeftX;
        this._upperLeftY = upperLeftY;
        this._lowerRightX = lowerRightX;
        this._lowerRightY = lowerRightY;
        this._cornerWidth = cornerWidth;
        this._cornerHeight = cornerHeight;
    }

    draw(wand: IDrawingWand): void {
        wand.roundRectangle(this._upperLeftX, this._upperLeftY, this._lowerRightX, this._lowerRightY, this._cornerWidth, this._cornerHeight);
    }
}
