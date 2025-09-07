/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { DrawableTextInterwordSpacing } from '@src/drawing/drawable-text-interword-spacing';
import { IDrawable } from '@src/drawing/drawable';

describe('Drawables#textInterwordSpacing', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .textInterwordSpacing(42);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextInterwordSpacing);

        const drawableTextInterwordSpacing = drawable as DrawableTextInterwordSpacing;
        expect(drawableTextInterwordSpacing.spacing).toBe(42);
    });
});
