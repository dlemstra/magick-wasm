/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { IMagickColor } from '../magick-color';

/**
 * Specifies the color of a background rectangle to place under text annotations.
 */
export class DrawableTextUnderColor implements IDrawable {
    private readonly _color: IMagickColor;

    /**
     * Initializes a new instance of the {@link DrawableTextUnderColor} class.
     * @param decoration - The color to use.
     */
    constructor(color: IMagickColor) {
        this._color = color;
    }

    draw(wand: IDrawingWand): void {
        wand.textUnderColor(this._color);
    }
}
