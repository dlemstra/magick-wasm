// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";
import { Magick } from "../magick";

export class DrawableFont implements IDrawable {
    _family: string;

    constructor(family: string) {
        this._family = family;
    }

    draw(wand: IDrawingWand): void {
        const fileName = Magick._getFontFileName(this._family);

        wand.font(fileName);
    }
}
