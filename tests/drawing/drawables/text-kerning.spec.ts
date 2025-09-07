/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableTextKerning } from '@src/drawing/drawable-text-kerning';

describe('Drawables#textKerning', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .textKerning(42);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextKerning);

        const drawableTextKerning = drawable as DrawableTextKerning;
        expect(drawableTextKerning.kerning).toBe(42);
    });
});
