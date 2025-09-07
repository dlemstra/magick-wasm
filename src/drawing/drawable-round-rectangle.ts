/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

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

    /**
     * Initializes a new instance of the {@link DrawableRoundRectangle} class.
     * @param upperLeftX The upper left X coordinate.
     * @param upperLeftY The upper left Y coordinate.
     * @param lowerRightX The lower right X coordinate.
     * @param lowerRightY The lower right Y coordinate.
     * @param cornerWidth The corner width.
     * @param cornerHeight The corner height.
     */
    constructor(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number) {
        this._upperLeftX = upperLeftX;
        this._upperLeftY = upperLeftY;
        this._lowerRightX = lowerRightX;
        this._lowerRightY = lowerRightY;
        this._cornerWidth = cornerWidth;
        this._cornerHeight = cornerHeight;
    }

    /**
     * Gets the upper left X coordinate.
     */
    get upperLeftX(): number { return this._upperLeftX; }

    /**
     * Gets the upper left Y coordinate.
     */
    get upperLeftY(): number { return this._upperLeftY; }

    /**
     * Gets the lower right X coordinate.
     */
    get lowerRightX(): number { return this._lowerRightX; }

    /**
     * Gets the lower right Y coordinate.
     */
    get lowerRightY(): number { return this._lowerRightY; }

    /**
     * Gets the corner width.
     */
    get cornerWidth(): number { return this._cornerWidth; }

    /**
     * Gets the corner height.
     */
    get cornerHeight(): number { return this._cornerHeight; }

    draw(wand: IDrawingWand): void {
        wand.roundRectangle(this._upperLeftX, this._upperLeftY, this._lowerRightX, this._lowerRightY, this._cornerWidth, this._cornerHeight);
    }
}
