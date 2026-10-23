/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ConvolveMatrix } from '@src/types/convolve-matrix';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#convolve', () => {
    it('should preserve the image with an identity kernel', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(original => {
                image.convolve(new ConvolveMatrix(1, [1]));

                expect(image).toEqualImage(original);
            });
        });
    });

    it('should spread a pixel using a box blur kernel', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Black, 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [255, 255, 255]);
            });

            image.convolve(new ConvolveMatrix(3, new Array<number>(9).fill(1 / 9)));

            expect(image.width).toBe(9);
            expect(image.height).toBe(9);
            expect(image).toHavePixelWithColor(4, 4, '#1c1c1c');
            expect(image).toHavePixelWithColor(3, 3, '#1c1c1c');
            expect(image).toHavePixelWithColor(2, 2, '#000000');
        });
    });
});
