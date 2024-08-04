/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableColor } from '@src/drawing/drawable-color';
import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { MagickColors } from '@src/magick-colors';
import { PaintMethod } from '@src/enums/paint-method';
import { TestImages } from '@test/test-images';

describe('DrawableFillColor', () => {
    it('should set the fill color for following drawing actions', () => {
        TestImages.Color.black.use((image) => {
            const fillColor = MagickColors.Red;

            image.draw([
                new DrawableFillColor(fillColor),
                new DrawableColor(0, 0, PaintMethod.Floodfill)
            ]);

            expect(image).toHavePixelWithColor(0, 0, fillColor);
        });
    });
});
