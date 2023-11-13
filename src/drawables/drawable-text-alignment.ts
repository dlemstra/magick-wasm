// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TextAlignment } from '../enums/text-alignment';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Specifies a text alignment to be applied when annotating with text.
 */
export class DrawableTextAlignment implements IDrawable {
    private readonly _alignment: TextAlignment;

    constructor(alignment: TextAlignment) {
        this._alignment = alignment;
    }

    draw(wand: IDrawingWand): void {
        wand.textAlignment(this._alignment);
    }
}
