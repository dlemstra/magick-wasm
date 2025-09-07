/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Gravity } from '../enums/gravity';
import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Sets the gravity to use when drawing.
 */
export class DrawableGravity implements IDrawable {
    private readonly _gravity: Gravity;

    /**
     * Initializes a new instance of the {@link DrawableGravity} class.
     * @param gravity The gravity to use.
     */
    constructor(gravity: Gravity) {
        this._gravity = gravity;
    }

    /**
     * Gets the gravity to use.
     */
    get gravity(): Gravity { return this._gravity; }

    draw(wand: IDrawingWand): void {
        wand.gravity(this._gravity);
    }
}
