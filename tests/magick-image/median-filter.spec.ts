/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#medianFilter', () => {
    it('should use the default radius', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.medianFilter();
                other.medianFilter(0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should replace isolated noise with the median neighborhood color', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [0, 0, 0]);
            });

            image.medianFilter(3);

            expect(image.width).toBe(9);
            expect(image.height).toBe(9);
            expect(image).toHavePixelWithColor(4, 4, MagickColors.White);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
        });
    });
});
