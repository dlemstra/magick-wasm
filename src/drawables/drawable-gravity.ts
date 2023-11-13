// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Gravity } from '../gravity';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the gravity to use when drawing.
 */
export class DrawableGravity implements IDrawable {
    private readonly _gravity: Gravity;

    constructor(gravity: Gravity) {
        this._gravity = gravity;
    }

    draw(wand: IDrawingWand): void {
        wand.gravity(this._gravity);
    }
}
