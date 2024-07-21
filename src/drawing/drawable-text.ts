// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Draws text on the image.
 */
export class DrawableText implements IDrawable {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _value: string;

    /**
     * Initializes a new instance of the {@link DrawableTextUnderColor} class.
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @param value - The text to draw.
     */
    constructor(x: number, y: number, value: string) {
        this._x = x;
        this._y = y;
        this._value = value;
    }

    draw(wand: IDrawingWand): void {
        wand.text(this._x, this._y, this._value);
    }
}
