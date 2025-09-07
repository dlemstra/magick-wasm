/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 *  Specifies the offset into the dash pattern to start the dash.
 */
export class DrawableStrokeDashOffset implements IDrawable {
    private readonly _offset: number;

    /**
     * Initializes a new instance of the {@link DrawableStrokeDashArray} class.
     * @param dash The dash offset.
     */
    constructor(offset: number) {
        this._offset = offset;
    }

    /**
     * Gets the dash offset.
     */
    get offset(): number { return this._offset; }

    draw(wand: IDrawingWand): void {
        wand.strokeDashOffset(this._offset);
    }
}
