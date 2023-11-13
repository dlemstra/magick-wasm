// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableColor } from '@src/drawables/drawable-color';
import { MagickColors } from '@src/magick-colors';
import { PaintMethod } from '@src/enums/paint-method';
import { TestImages } from '@test/test-images';

describe('DrawableColor', () => {
    it('should color the image with the default fill color', () => {
        TestImages.Color.white.use((image) => {
            image.draw([new DrawableColor(0, 0, PaintMethod.Floodfill)]);

            const fillColor = MagickColors.Black;
            expect(image).toHavePixelWithColor(0, 0, fillColor);
            expect(image).toHavePixelWithColor(1, 0, fillColor);
            expect(image).toHavePixelWithColor(0, 1, fillColor);
            expect(image).toHavePixelWithColor(1, 1, fillColor);
        });
    });
});
