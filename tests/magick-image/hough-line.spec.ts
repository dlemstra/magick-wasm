/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#houghLine', () => {
    it('should use the default neighborhood and threshold', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Black, 64, 64);
            image.getPixels(pixels => {
                for (let x = 8; x < 56; x++)
                    pixels.setPixel(x, 32, [255, 255, 255]);
            });
            image.backgroundColor = MagickColors.White;
            image.clone(other => {
                image.houghLine();
                other.houghLine(0, 0, 40);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should identify lines in the image', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Black, 64, 64);
            image.getPixels(pixels => {
                for (let x = 8; x < 56; x++)
                    pixels.setPixel(x, 32, [255, 255, 255]);
            });
            image.backgroundColor = MagickColors.White;

            image.houghLine(9, 9, 40);

            expect(image.width).toBe(64);
            expect(image.height).toBe(64);
            expect(image).toHavePixelWithColor(0, 32, MagickColors.Black);
            expect(image).toHavePixelWithColor(32, 0, MagickColors.White);
        });
    });
});
