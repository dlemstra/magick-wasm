/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Draws a rectangle given two coordinates and using the current stroke, stroke width, and fill
 * settings.
 */
export class DrawableRectangle implements IDrawable {
    private readonly _upperLeftX: number;
    private readonly _upperLeftY: number;
    private readonly _lowerRightX: number;
    private readonly _lowerRightY: number;

    /**
      * Initializes a new instance of the {@link DrawablePoint} class.
      * @param upperLeftX The upper left X coordinate.
      * @param upperLeftY The upper left Y coordinate.
      * @param lowerRightX The lower right X coordinate.
      * @param lowerRightY The lower right Y coordinate.
      */
    constructor(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number) {
        this._upperLeftX = upperLeftX;
        this._upperLeftY = upperLeftY;
        this._lowerRightX = lowerRightX;
        this._lowerRightY = lowerRightY;
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

    draw(wand: IDrawingWand): void {
        wand.rectangle(this._upperLeftX, this._upperLeftY, this._lowerRightX, this._lowerRightY);
    }
}
