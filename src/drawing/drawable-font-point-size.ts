/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the font pointsize to use when annotating with text.
 */
export class DrawableFontPointSize implements IDrawable {
    private readonly _pointSize: number;

    /**
     * Initializes a new instance of the {@link DrawableFontPointSize} class.
     * @param pointSize The point size.
     */
    constructor(pointSize: number) {
        this._pointSize = pointSize;
    }

    /**
     * Gets the point size.
     */
    get pointSize(): number { return this._pointSize; }

    draw(wand: IDrawingWand): void {
        wand.fontPointSize(this._pointSize);
    }
}
