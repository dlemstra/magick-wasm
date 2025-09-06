/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { FillRule } from '../enums/fill-rule';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the fill rule to use while drawing polygons.
 */
export class DrawableFillRule implements IDrawable {
    private readonly _fillRule: FillRule;

    /**
     * Initializes a new instance of the {@link DrawableFillRule} class.
     * @param opacity The opacity.
     */
    constructor(fillRule: FillRule) {
        this._fillRule = fillRule;
    }

    draw(wand: IDrawingWand): void {
        wand.fillRule(this._fillRule);
    }
}
