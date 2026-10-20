/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#edge', () => {
    it('should highlight edges in the image', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [0, 0, 0]);
            });

            image.edge(1);

            expect(image.width).toBe(9);
            expect(image.height).toBe(9);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Black);
            expect(image).toHavePixelWithColor(4, 4, MagickColors.Black);
            expect(image).toHavePixelWithColor(3, 4, MagickColors.White);
            expect(image).toHavePixelWithColor(4, 3, MagickColors.White);
        });
    });
});
