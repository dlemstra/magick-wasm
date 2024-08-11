/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TextDecoration } from '../enums/text-decoration';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Specifies a decoration to be applied when annotating with text.
 */
export class DrawableTextDecoration implements IDrawable {
    private readonly _decoration: TextDecoration;

    /**
     * Initializes a new instance of the {@link DrawableTextDecoration} class.
     * @param decoration The text decoration.
     */
    constructor(decoration: TextDecoration) {
        this._decoration = decoration;
    }

    draw(wand: IDrawingWand): void {
        wand.textDecoration(this._decoration);
    }
}
