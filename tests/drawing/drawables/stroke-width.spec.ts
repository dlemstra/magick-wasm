/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableStrokeWidth } from '@src/drawing/drawable-stroke-width';

describe('Drawables#strokeWidth', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .strokeWidth(42);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableStrokeWidth);

        const drawableStrokeWidth = drawable as DrawableStrokeWidth;
        expect(drawableStrokeWidth.width).toBe(42);
    });
});
