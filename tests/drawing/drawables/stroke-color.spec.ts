/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { MagickColors } from '@src/magick-colors';
import { DrawableStrokeColor } from '@src/drawing/drawable-stroke-color';

describe('Drawables#strokeColor', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .strokeColor(MagickColors.Purple);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableStrokeColor);

        const drawableStrokeColor = drawable as DrawableStrokeColor;
        expect(drawableStrokeColor.color).toStrictEqual(MagickColors.Purple);
    });
});
