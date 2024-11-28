/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('PixelCollection#setPixel', () => {
    it('should set the pixels at the specified location', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.getPixels(pixels => {
                const data = [0, 0, 0, 0];
                pixels.setPixel(1, 0, data);

                expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
                expect(image).toHavePixelWithColor(0, 1, MagickColors.White);
                expect(image).toHavePixelWithColor(1, 0, MagickColors.Black);
                expect(image).toHavePixelWithColor(1, 1, MagickColors.White);
            });
        });
    });
});
