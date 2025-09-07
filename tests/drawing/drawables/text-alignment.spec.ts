/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { DrawableTextAlignment } from '@src/drawing/drawable-text-alignment';
import { IDrawable } from '@src/drawing/drawable';
import { TextAlignment } from '@src/enums/text-alignment';

describe('Drawables#textAlignment', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .textAlignment(TextAlignment.Left);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextAlignment);

        const drawableTextAlignment = drawable as DrawableTextAlignment;
        expect(drawableTextAlignment.alignment).toBe(TextAlignment.Left);
    });
});
