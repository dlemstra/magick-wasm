/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableBorderColor } from '@src/drawing/drawable-border-color';
import { Drawables } from '@src/drawing/drawables';
import { MagickColors } from '@src/magick-colors';

describe('Drawables#borderColor', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .borderColor(MagickColors.Purple);

        const drawable = (drawables as any)._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableBorderColor);

        const drawableBorderColor = drawable as DrawableBorderColor;
        expect(drawableBorderColor.color).toStrictEqual(MagickColors.Purple);
    });
});
