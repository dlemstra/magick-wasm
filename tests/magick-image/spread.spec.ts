/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { Magick } from '@src/magick';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#spread', () => {
    it('should use the image interpolation method and default radius', () => {
        try {
            TestFiles.Images.Builtin.logo.use(image => {
                image.resize(32, 24);
                image.interpolate = PixelInterpolateMethod.Nearest;
                image.clone(other => {
                    Magick.setRandomSeed(12345);
                    image.spread();
                    Magick.setRandomSeed(12345);
                    other.spread(PixelInterpolateMethod.Nearest, 3);

                    expect(image).toEqualImage(other);
                });
            });
        } finally {
            Magick.resetRandomSeed();
        }
    });

    it('should use undefined interpolation with an explicit radius', () => {
        try {
            TestFiles.Images.Builtin.logo.use(image => {
                image.resize(32, 24);
                image.interpolate = PixelInterpolateMethod.Nearest;
                image.clone(other => {
                    Magick.setRandomSeed(12345);
                    image.spread(5);
                    Magick.setRandomSeed(12345);
                    other.spread(PixelInterpolateMethod.Undefined, 5);

                    expect(image).toEqualImage(other);
                });
            });
        } finally {
            Magick.resetRandomSeed();
        }
    });

    it('should spread pixels within the specified neighborhood', () => {
        try {
            Magick.setRandomSeed(12345);
            TestFiles.Images.empty.use(image => {
                image.read(MagickColors.Black, 32, 32);
                image.getPixels(pixels => {
                    for (let y = 0; y < 32; y++) {
                        for (let x = 16; x < 32; x++)
                            pixels.setPixel(x, y, [255, 255, 255]);
                    }
                });

                image.spread(PixelInterpolateMethod.Nearest, 3);

                expect(image.width).toBe(32);
                expect(image.height).toBe(32);
                expect(image).toHavePixelWithColor(4, 16, MagickColors.Black);
                expect(image).toHavePixelWithColor(28, 16, MagickColors.White);
                image.getPixels(pixels => {
                    let changed = 0;
                    for (let y = 0; y < 32; y++) {
                        for (let x = 12; x < 20; x++) {
                            const value = pixels.getPixel(x, y)[0];
                            expect([0, 255]).toContain(value);
                            if (value !== (x < 16 ? 0 : 255))
                                changed++;
                        }
                    }
                    expect(changed).toBe(51);
                });
            });
        } finally {
            Magick.resetRandomSeed();
        }
    });
});
