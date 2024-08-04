/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { PaintMethod } from '../enums/paint-method';

/**
 * Draws color on image using the current fill color, starting at specified position, and using
 * specified paint method.
 */
/**
 * Represents a drawable color.
 * @implements {IDrawable}
 */
export class DrawableColor implements IDrawable {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _paintMethod: PaintMethod;

    /**
     * Initializes a new instance of the {@link DrawableColor} class.
     * @param x - The X coordinate.
     * @param  y - The Y coordinate.
     * @param paintMethod - The paint method to use.
     */
    constructor(x: number, y: number, paintMethod: PaintMethod) {
        this._x = x;
        this._y = y;
        this._paintMethod = paintMethod;
    }

    draw(wand: IDrawingWand): void {
        wand.color(this._x, this._y, this._paintMethod);
    }
}
