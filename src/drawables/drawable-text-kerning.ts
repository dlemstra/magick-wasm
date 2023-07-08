// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

export class DrawableTextKerning implements IDrawable {
    private readonly _kerning: number;

    constructor(kerning: number) {
        this._kerning = kerning;
    }

    draw(wand: IDrawingWand): void {
        wand.textKerning(this._kerning);
    }
}
