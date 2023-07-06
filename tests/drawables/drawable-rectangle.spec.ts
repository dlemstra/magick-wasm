// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableRectangle } from '../../src/drawables/drawable-rectangle';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { MagickColors } from '../../src/magick-colors';
import { TestImages } from '../test-images';

describe('DrawableRectangle', () => {
    it('should draw a rectangle', () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFillColor(MagickColors.Green),
                new DrawableRectangle(1, 1, 3, 2),
            ]);

            // Check a corner
            expect(image).toHavePixelWithColor(0, 0, '#ffffffff');
            expect(image).toHavePixelWithColor(0, 3, '#ffffffff');
            expect(image).toHavePixelWithColor(3, 0, '#ffffffff');

            // Check the inside
            expect(image).toHavePixelWithColor(1, 1, '#008000ff');
            expect(image).toHavePixelWithColor(3, 2, '#008000ff');
        });
    });
});
