// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";

export class DrawableTextInterwordSpacing implements IDrawable {
    private readonly _spacing: number;

    constructor(spacing: number) {
        this._spacing = spacing;
    }

    draw(wand: IDrawingWand): void {
        wand.textInterwordspacing(this._spacing);
    }
}
