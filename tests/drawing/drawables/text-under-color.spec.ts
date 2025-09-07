/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { DrawableTextUnderColor } from '@src/drawing/drawable-text-under-color';
import { IDrawable } from '@src/drawing/drawable';
import { MagickColors } from '@src/magick-colors';

describe('Drawables#textUnderColor', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .textUnderColor(MagickColors.Purple);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableTextUnderColor);

        const drawableTextUnderColor = drawable as DrawableTextUnderColor;
        expect(drawableTextUnderColor.color).toStrictEqual(MagickColors.Purple);
    });
});
