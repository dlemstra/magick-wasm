// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Percentage } from '../percentage';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

export class DrawableFillOpacity implements IDrawable {
    private readonly _opacity: Percentage;

    constructor(opacity: Percentage) {
        this._opacity = opacity;
    }

    draw(wand: IDrawingWand): void {
        wand.fillOpacity(this._opacity.toDouble() / 100);
    }
}
