// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the spacing between words in text.
 */
export class DrawableTextInterwordSpacing implements IDrawable {
    private readonly _spacing: number;

    /**
     * Initializes a new instance of the {@link DrawableTextInterwordSpacing} class.
     * @param decoration - The spacing to use.
     */
    constructor(spacing: number) {
        this._spacing = spacing;
    }

    draw(wand: IDrawingWand): void {
        wand.textInterwordspacing(this._spacing);
    }
}
