// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { Percentage } from '../types/percentage';

/**
 * Sets the alpha to use when drawing using the fill color or fill texture.
 */
export class DrawableFillOpacity implements IDrawable {
    private readonly _opacity: Percentage;

    /**
     * Initializes a new instance of the {@link DrawableFillOpacity} class.
     * @param opacity - The opacity.
     */
    constructor(opacity: Percentage) {
        this._opacity = opacity;
    }

    draw(wand: IDrawingWand): void {
        wand.fillOpacity(this._opacity.toDouble() / 100);
    }
}
