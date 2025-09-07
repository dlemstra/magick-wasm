/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Draws a line on the image using the current stroke color, stroke alpha, and stroke width.
 */
export class DrawableLine implements IDrawable {
    private readonly _startX: number;
    private readonly _startY: number;
    private readonly _endX: number;
    private readonly _endY: number;

    /**
     * Initializes a new instance of the {@link DrawableLine} class.
     * @param startX The starting X coordinate.
     * @param startY The starting Y coordinate.
     * @param endX The ending X coordinate.
     * @param endY The ending Y coordinate.
     */
    constructor(startX: number, startY: number, endX: number, endY: number) {
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
    }

    /**
     * Gets the starting X coordinate.
     */
    get startX(): number { return this._startX; }

    /**
     * Gets the starting Y coordinate.
     */
    get startY(): number { return this._startY; }

    /**
     * Gets the ending X coordinate.
     */
    get endX(): number { return this._endX; }

    /**
     * Gets the ending Y coordinate.
     */
    get endY(): number { return this._endY; }

    draw(wand: IDrawingWand): void {
        wand.line(this._startX, this._startY, this._endX, this._endY);
    }
}
