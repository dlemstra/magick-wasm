// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableLine } from '@src/drawing/drawable-line';
import { DrawableStrokeColor } from '@src/drawing/drawable-stroke-color';
import { DrawableStrokeWidth } from '@src/drawing/drawable-stroke-width';
import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('DrawableStrokeWidth', () => {
    it('should change the width of a line', () => {
        TestImages.empty150x150Canvas.use((image) => {
            const strokeColor = MagickColors.Green;

            image.draw([
                new DrawableStrokeColor(strokeColor),
                new DrawableStrokeWidth(10),
                new DrawableLine(10, 10, 40, 50)
            ]);

            expect(image).toHavePixelWithColor(9, 9, MagickColors.White);
            expect(image).toHavePixelWithColor(10, 10, strokeColor);
            expect(image).toHavePixelWithColor(6, 13, strokeColor);
            expect(image).toHavePixelWithColor(44, 47, strokeColor);
            expect(image).toHavePixelWithColor(40, 50, strokeColor);
        });
    });
});
