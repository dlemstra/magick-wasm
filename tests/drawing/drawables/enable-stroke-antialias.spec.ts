/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableTextAntialias } from '@src/drawing/drawable-text-antialias';
import { Drawables } from '@src/drawing/drawables';

describe('Drawables#enableStrokeAntialias', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .enableStrokeAntialias();

        const drawable = (drawables as any)._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextAntialias);

        const drawableColor = drawable as DrawableTextAntialias;
        expect(drawableColor.isEnabled).toBe(true);
    });
});
