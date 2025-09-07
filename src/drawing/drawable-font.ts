/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { Magick } from '../magick';

/**
 * Sets the font to use when annotating with text.
 */
export class DrawableFont implements IDrawable {
    private readonly _font: string;

    /**
     * Initializes a new instance of the {@link DrawableFont} class.
     * @param opacity The name of the font that was registered.
     */
    constructor(font: string) {
        this._font = font;
    }

    /**
     * Gets the name of the font that was registered.
     */
    get font(): string { return this._font; }

    draw(wand: IDrawingWand): void {
        const fileName = Magick._getFontFileName(this._font);

        wand.font(fileName);
    }
}
