/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { IMagickColor } from '../magick-color';

/**
 * Sets the color used for stroking object outlines.
 */
export class DrawableStrokeColor implements IDrawable {
    private readonly _color: IMagickColor;

    /**
     * Initializes a new instance of the {@link DrawableStrokeColor} class.
     * @param color The color to use.
     */
    constructor(color: IMagickColor) {
        this._color = color;
    }

    draw(wand: IDrawingWand): void {
        wand.strokeColor(this._color);
    }
}
