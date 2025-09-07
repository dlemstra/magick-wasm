/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { TextAlignment } from '@src/enums/text-alignment';
import { DrawableTextDecoration } from '@src/drawing/drawable-text-decoration';
import { TextDecoration } from '@src/enums/text-decoration';

describe('Drawables#textDecoration', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .textDecoration(TextDecoration.Overline);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextDecoration);

        const drawableTextAlignment = drawable as DrawableTextDecoration;
        expect(drawableTextAlignment.decoration).toBe(TextDecoration.Overline);
    });
});
