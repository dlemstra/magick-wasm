/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableRectangle } from '@src/drawing/drawable-rectangle';
import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('DrawableRectangle', () => {
    it('should draw a rectangle', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFillColor(MagickColors.Green),
                new DrawableRectangle(1, 1, 3, 2),
            ]);

            expect(image).toHavePixelWithColor(0, 0, '#ffffff');
            expect(image).toHavePixelWithColor(0, 3, '#ffffff');
            expect(image).toHavePixelWithColor(3, 0, '#ffffff');

            expect(image).toHavePixelWithColor(1, 1, '#008000');
            expect(image).toHavePixelWithColor(3, 2, '#008000');
        });
    });
});
