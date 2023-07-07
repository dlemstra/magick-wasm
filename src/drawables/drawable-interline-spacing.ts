// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";

export class DrawableInterlineSpacing implements IDrawable {
    private readonly _interlineSpacing: number;

    constructor(interlineSpacing: number) {
        this._interlineSpacing = interlineSpacing;
    }

    draw(wand: IDrawingWand): void {
        wand.interlineSpacing(this._interlineSpacing);
    }
}