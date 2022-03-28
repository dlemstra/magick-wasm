// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";
import { Percentage } from "../percentage";

export class DrawableFillOpacity implements IDrawable {
    _opacity: Percentage

    constructor(opacity: Percentage) {
        this._opacity = opacity;
    }

    draw(wand: IDrawingWand): void {
        wand.fillOpacity(this._opacity.toDouble() / 100);
    }
}
