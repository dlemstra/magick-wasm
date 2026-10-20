/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#kuwahara', () => {
    it('should use the default radius and sigma', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.kuwahara();
                other.kuwahara(0, 1);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should reduce noise while preserving edges', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 16, 16);
            image.getPixels(pixels => {
                for (let y = 0; y < 16; y++) {
                    for (let x = 0; x < 8; x++)
                        pixels.setPixel(x, y, [0, 0, 0]);
                }
                pixels.setPixel(12, 8, [128, 128, 128]);
            });

            image.kuwahara(2, 1);

            expect(image.width).toBe(16);
            expect(image.height).toBe(16);
            image.getPixels(pixels => {
                expect(pixels.getPixel(12, 8)[0]).toBe(242);
                expect(pixels.getPixel(7, 8)[0]).toBe(47);
                expect(pixels.getPixel(8, 8)[0]).toBe(246);
            });
        });
    });
});
