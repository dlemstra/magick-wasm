/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableTextAntialias } from '@src/drawing/drawable-text-antialias';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';

describe('Drawables#disableStrokeAntialias', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .disableStrokeAntialias();

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextAntialias);

        const drawableTextAntialias = drawable as DrawableTextAntialias;
        expect(drawableTextAntialias.isEnabled).toBe(false);
    });
});
