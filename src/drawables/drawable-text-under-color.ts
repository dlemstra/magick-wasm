// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { MagickColor } from '../magick-color';

/**
 * Specifies the color of a background rectangle to place under text annotations.
 */
export class DrawableTextUnderColor implements IDrawable {
    private readonly _color: MagickColor;

    constructor(color: MagickColor) {
        this._color = color;
    }

    draw(wand: IDrawingWand): void {
        wand.textUnderColor(this._color);
    }
}
