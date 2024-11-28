/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableLine } from '@src/drawing/drawable-line';
import { DrawableStrokeColor } from '@src/drawing/drawable-stroke-color';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('DrawableStrokeColor', () => {
    it('should be used as the color for a line instead of fill color', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            const strokeColor = MagickColors.Green;

            image.draw([
                new DrawableFillColor(MagickColors.Red),
                new DrawableStrokeColor(strokeColor),
                new DrawableLine(1, 1, 2, 2)
            ]);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
            expect(image).toHavePixelWithColor(1, 1, strokeColor);
            expect(image).toHavePixelWithColor(2, 2, strokeColor);
        });
    });
});
