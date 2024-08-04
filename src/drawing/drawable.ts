/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IDrawingWand } from './drawing-wand';

/**
 * Interface for drawables.
 */
export interface IDrawable {
    draw(wand: IDrawingWand): void;
}
