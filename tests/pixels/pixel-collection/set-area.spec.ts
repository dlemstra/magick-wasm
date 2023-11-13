// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('PixelCollection#setArea', () => {
    it('should set the pixels at the specified location', () => {
        TestImages.Builtin.logo.use((image) => {
            image.getPixels(pixels => {
                const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                pixels.setArea(0, 0, 2, 2, data);

                expect(image).toHavePixelWithColor(0, 0, MagickColors.Black);
                expect(image).toHavePixelWithColor(0, 1, MagickColors.Black);
                expect(image).toHavePixelWithColor(1, 0, MagickColors.Black);
                expect(image).toHavePixelWithColor(1, 1, MagickColors.Black);
            });
        });
    });
});
