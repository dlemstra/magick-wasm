/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#meanShift', () => {
    it('should use a square neighborhood and default color distance', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.meanShift(3);
                other.meanShift(3, 3, new Percentage(10));

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use a square neighborhood with the specified color distance', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.meanShift(3, new Percentage(50));
                other.meanShift(3, 3, new Percentage(50));

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use the default color distance with a rectangular neighborhood', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.meanShift(3, 5);
                other.meanShift(3, 5, new Percentage(10));

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should cluster nearby colors within the specified color distance', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [128, 128, 128]);
            });
            image.clone(other => {
                image.meanShift(3, 5, new Percentage(100));
                other.meanShift(3, 5, new Percentage(10));

                expect(image.width).toBe(9);
                expect(image.height).toBe(9);
                expect(other).toHavePixelWithColor(4, 4, '#808080');
                image.getPixels(pixels => {
                    expect(pixels.getPixel(4, 4)[0]).toBeGreaterThan(230);
                });
            });
        });
    });
});
