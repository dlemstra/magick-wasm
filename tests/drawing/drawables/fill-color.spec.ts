/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { MagickColors } from '@src/magick-colors';

describe('Drawables#fillColor', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .fillColor(MagickColors.Purple);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableFillColor);

        const drawableFillColor = drawable as DrawableFillColor;
        expect(drawableFillColor.color).toStrictEqual(MagickColors.Purple);
    });
});
