/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawable } from './drawable';
import { IDrawingWand } from './drawing-wand';

/**
 * Controls whether text is antialiased. Text is antialiased by default.
 */
export class DrawableTextAntiAlias implements IDrawable {
    private readonly _isEnabled: boolean;

    private constructor(isEnabled: boolean) {
        this._isEnabled = isEnabled;
    }

    /**
     * Initializes a new instance of the {@link DrawableTextAntiAlias} class with antialias disabled.
     */
    static get disabled(): DrawableTextAntiAlias { return new DrawableTextAntiAlias(false); }

    /**
     * Initializes a new instance of the {@link DrawableTextAntiAlias} class with antialias enabled.
     */
    static get enabled(): DrawableTextAntiAlias { return new DrawableTextAntiAlias(true); }

    /**
     * Gets a value indicating whether antialias is enabled.
     */
    get isEnabled(): boolean { return this._isEnabled; }

    draw(wand: IDrawingWand): void {
        wand.textAntialias(this._isEnabled);
    }
}
