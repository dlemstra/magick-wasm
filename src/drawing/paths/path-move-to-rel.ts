/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawingWand } from '../drawing-wand';
import { IPath } from '../path';

/**
 * Draws a line path from the current point to the given coordinate using relative coordinates.
 * The coordinate then becomes the new current point.
 */
export class PathMoveToRel implements IPath {
    private readonly _x: number;
    private readonly _y: number;

    /**
     * Initializes a new instance of the {@link IPathMoveToAbs} class.
     * @param opacity The opacity.
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    draw(wand: IDrawingWand): void {
        wand.pathMoveToRel(this._x, this._y);
    }
}
