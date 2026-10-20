/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#reduceNoise', () => {
    it('should use the default order', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.reduceNoise();
                other.reduceNoise(3);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should eliminate isolated noise peaks', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 9, 9);
            image.getPixels(pixels => {
                for (let y = 0; y < 9; y++) {
                    for (let x = 0; x < 9; x++) {
                        const value = 180 + x * 5;
                        pixels.setPixel(x, y, [value, value, value]);
                    }
                }
                pixels.setPixel(4, 4, [0, 0, 0]);
            });

            image.reduceNoise(5);

            expect(image.width).toBe(9);
            expect(image.height).toBe(9);
            expect(image).toHavePixelWithColor(4, 4, '#c8c8c8');
        });
    });
});
