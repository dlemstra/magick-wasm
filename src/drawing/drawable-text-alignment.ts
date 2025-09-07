/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TextAlignment } from '../enums/text-alignment';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Specifies a text alignment to be applied when annotating with text.
 */
export class DrawableTextAlignment implements IDrawable {
    private readonly _alignment: TextAlignment;

    /**
     * Initializes a new instance of the {@link DrawableFillColor} class.
     * @param alignment The text alignment
     */
    constructor(alignment: TextAlignment) {
        this._alignment = alignment;
    }

    /**
     * Gets the text alignment.
     */
    get alignment(): TextAlignment { return this._alignment; }

    draw(wand: IDrawingWand): void {
        wand.textAlignment(this._alignment);
    }
}
