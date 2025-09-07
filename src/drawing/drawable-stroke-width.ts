/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the width of the stroke used to draw object outlines.
 */
export class DrawableStrokeWidth implements IDrawable {
    private readonly _width: number;

    /**
     * Initializes a new instance of the {@link DrawableStrokeWidth} class.
     * @param width The width.
     */
    constructor(width: number) {
        this._width = width;
    }

    /**
     * Gets the width.
     */
    get width(): number { return this._width; }

    draw(wand: IDrawingWand): void {
        wand.strokeWidth(this._width);
    }
}
