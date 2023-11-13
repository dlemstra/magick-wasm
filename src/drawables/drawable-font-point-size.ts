// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the alpha to use when drawing using the fill color or fill texture.
 */
export class DrawableFontPointSize implements IDrawable {
    private readonly _pointSize: number;

    constructor(pointSize: number) {
        this._pointSize = pointSize;
    }

    draw(wand: IDrawingWand): void {
        wand.fontPointSize(this._pointSize);
    }
}
