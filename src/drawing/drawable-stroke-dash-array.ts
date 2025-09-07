/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Specifies the pattern of dashes and gaps used to stroke paths. The stroke dash array
 * represents an array of numbers that specify the lengths of alternating dashes and gaps in
 * pixels. If an odd number of values is provided, then the list of values is repeated to yield
 * an even number of values. To remove an existing dash array, pass a null dasharray. A typical
 * stroke dash array might contain the members 5 3 2.
 */
export class DrawableStrokeDashArray implements IDrawable {
    private readonly _dash: number[] = [];

    /**
     * Initializes a new instance of the {@link DrawableStrokeDashArray} class.
     * @param dash An array containing the dash information.
     */
    constructor(dash: number[]) {
        this._dash = [...dash];
    }

    /**
     * Gets the dash array.
     */
    get dash(): ReadonlyArray<number> { return this._dash; }

    draw(wand: IDrawingWand): void {
        wand.strokeDashArray(this._dash);
    }
}
