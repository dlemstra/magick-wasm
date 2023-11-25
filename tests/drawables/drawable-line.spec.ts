// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableLine } from '@src/drawables/drawable-line';
import { DrawableFillColor } from '@src/drawables/drawable-fill-color';
import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('DrawableLine', () => {
    it('should draw a line on the image', () => {
        TestImages.empty150x150Canvas.use((image) => {
            const fillColor = MagickColors.Red;

            image.draw([
                new DrawableFillColor(fillColor),
                new DrawableLine(10, 10, 40, 50)
            ]);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
            expect(image).toHavePixelWithColor(10, 10, fillColor);
            expect(image).toHavePixelWithColor(22, 26, fillColor);
            expect(image).toHavePixelWithColor(40, 50, fillColor);
        });
    });
});
