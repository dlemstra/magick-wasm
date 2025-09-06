/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';
import { IPath } from './path';

/**
 * Draws a set of paths.
 */
export class DrawablePath implements IDrawable {
    private _paths: IPath[] = [];

    /**
     * Initializes a new instance of the {@link DrawablePath} class.
     * @param paths The paths to use.
     */
    constructor(paths: IPath[]) {
        this._paths = paths;
    }

    draw(wand: IDrawingWand): void {
        wand.pathStart();
        for (const path of this._paths) {
            path.draw(wand);
        }
        wand.pathFinish();
    }
}
