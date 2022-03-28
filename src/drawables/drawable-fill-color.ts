// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColor } from "../magick-color";
import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";

export class DrawableFillColor implements IDrawable {
    _color: MagickColor

    constructor(color: MagickColor) {
        this._color = color;
    }

    draw(wand: IDrawingWand): void {
        wand.fillColor(this._color);
    }
}
