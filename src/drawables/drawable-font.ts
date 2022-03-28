// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { FontStyleType } from "../font-style-type";
import { FontWeight } from "../font-weight";
import { FontStretch } from "../font-stretch";
import { IDrawable } from "./drawable";
import { IDrawingWand } from "./drawing-wand";
import { Magick } from "../magick";

export class DrawableFont implements IDrawable {
    _family: string;
    _style: FontStyleType;
    _weight: FontWeight;
    _stretch: FontStretch;

    constructor(family: string);
    constructor(family: string, style: FontStyleType, weight: FontWeight, stretch: FontStretch);
    constructor(family: string, style?: FontStyleType, weight?: FontWeight, stretch?: FontStretch) {
        this._family = family;
        this._style = style ?? FontStyleType.Any;
        this._weight = weight ?? FontWeight.Normal;
        this._stretch = stretch ?? FontStretch.Normal;
    }

    draw(wand: IDrawingWand): void {
        const fileName = Magick._getFontFileName(this._family);

        wand.font(fileName);

        wand.fontFamily(fileName, this._style, this._weight, this._stretch);
    }
}
