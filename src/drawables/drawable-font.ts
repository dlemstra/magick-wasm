// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { Magick } from '../magick';

/**
 * Sets the font to use when annotating with text.
 */
export class DrawableFont implements IDrawable {
    private readonly _font: string;

    constructor(font: string) {
        this._font = font;
    }

    draw(wand: IDrawingWand): void {
        const fileName = Magick._getFontFileName(this._font);

        wand.font(fileName);
    }
}
