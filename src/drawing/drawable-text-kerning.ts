/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the spacing between characters in text.
 */
export class DrawableTextKerning implements IDrawable {
    private readonly _kerning: number;

    /**
     * Initializes a new instance of the {@link DrawableTextKerning} class.
     * @param kerning The kerning to use.
     */
    constructor(kerning: number) {
        this._kerning = kerning;
    }

    /**
     * Gets the kerning to use.
     */
    get kerning(): number { return this._kerning; }

    draw(wand: IDrawingWand): void {
        wand.textKerning(this._kerning);
    }
}
