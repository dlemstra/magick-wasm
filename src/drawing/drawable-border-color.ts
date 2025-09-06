/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { IMagickColor } from '../magick-color';

/**
 * Sets the border color to be used for drawing filled objects.
 */
export class DrawableBorderColor implements IDrawable {
    private readonly _color: IMagickColor;

    /**
     * Initializes a new instance of the {@link DrawableBorderColor} class.
     * @param color The color to use.
     */
    constructor(color: IMagickColor) {
        this._color = color;
    }

    draw(wand: IDrawingWand): void {
        wand.borderColor(this._color);
    }
}
