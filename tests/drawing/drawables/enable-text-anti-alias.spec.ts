/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableTextAntiAlias } from '@src/drawing/drawable-text-anti-alias';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';

describe('Drawables#enableTextAntialias', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .enableTextAntiAlias();

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextAntiAlias);

        const drawableTextAntialias = drawable as DrawableTextAntiAlias;
        expect(drawableTextAntialias.isEnabled).toBe(true);
    });
});
