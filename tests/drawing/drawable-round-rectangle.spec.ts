// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableRoundRectangle } from '@src/drawing/drawable-round-rectangle';
import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('DrawableRoundRectangle', () => {
    it('should draw a rounded rectangle', () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFillColor(MagickColors.Green),
                new DrawableRoundRectangle(0, 0, 11, 11, 5, 5),
            ]);

            // Check a corner
            expect(image).toHavePixelWithColor(0, 0, '#ffffffff');
            expect(image).toHavePixelWithColor(0, 1, '#ffffffff');
            expect(image).toHavePixelWithColor(1, 0, '#ffffffff');

            // Check an edge and inside
            expect(image).toHavePixelWithColor(6, 0, '#008000ff');
            expect(image).toHavePixelWithColor(6, 6, '#008000ff');
        });
    });
});
