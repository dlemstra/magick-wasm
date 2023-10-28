// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableFillColor } from '@src/drawables/drawable-fill-color';
import { DrawablePoint } from '@src/drawables/drawable-point';
import { MagickColor } from '@src/magick-color';
import { TestImages } from '@test/test-images';

describe('DrawablePoint', () => {
    it('should set point in the image', () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFillColor(new MagickColor('pink')),
                new DrawablePoint(100, 100),
            ])

            expect(image).toHavePixelWithColor(100, 100, '#ffc0cbff');
        });
    });
});
