/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Draws a point using the current fill color.
 */
export class DrawablePoint implements IDrawable {
    private readonly _x: number;
    private readonly _y: number;

    /**
     * Initializes a new instance of the {@link DrawablePoint} class.
     * @param x The X coordinate.
     * @param y The Y coordinate.
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
     * Gets the X coordinate.
     */
    get x(): number { return this._x; }

    /**
     * Gets the Y coordinate.
     */
    get y(): number { return this._y; }

    draw(wand: IDrawingWand): void {
        wand.point(this._x, this._y);
    }
}
