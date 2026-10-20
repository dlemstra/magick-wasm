/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { Quantum } from '@src/quantum';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#rangeThreshold', () => {
    it('should convert percentage thresholds to quantum values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.rangeThreshold(new Percentage(10), new Percentage(30), new Percentage(60), new Percentage(90));
                other.rangeThreshold(Quantum.max * 0.1, Quantum.max * 0.3, Quantum.max * 0.6, Quantum.max * 0.9);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should apply soft thresholds between the black and white ranges', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Black, 5, 1);
            image.getPixels(pixels => {
                for (let x = 0; x < 5; x++) {
                    const value = x * 60;
                    pixels.setPixel(x, 0, [value, value, value]);
                }
            });

            image.rangeThreshold(30, 90, 150, 210);

            expect(image.width).toBe(5);
            expect(image.height).toBe(1);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Black);
            expect(image).toHavePixelWithColor(1, 0, '#7f7f7f');
            expect(image).toHavePixelWithColor(2, 0, MagickColors.White);
            expect(image).toHavePixelWithColor(3, 0, '#7f7f7f');
            expect(image).toHavePixelWithColor(4, 0, MagickColors.Black);
        });
    });

    it('should apply hard thresholds when the black and white limits coincide', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Black, 3, 1);
            image.getPixels(pixels => {
                pixels.setPixel(0, 0, [30, 30, 30]);
                pixels.setPixel(1, 0, [120, 120, 120]);
                pixels.setPixel(2, 0, [240, 240, 240]);
            });

            image.rangeThreshold(60, 60, 180, 180);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.Black);
            expect(image).toHavePixelWithColor(1, 0, MagickColors.White);
            expect(image).toHavePixelWithColor(2, 0, MagickColors.Black);
        });
    });
});
