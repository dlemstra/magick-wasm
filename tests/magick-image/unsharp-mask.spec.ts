/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColor } from '@src/magick-color';
import { TestFiles } from '@test/test-files';

describe('MagickImage#unsharpMask', () => {
    it('should use the default amount and threshold', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.unsharpMask(2, 1);
                other.unsharpMask(2, 1, 1.0, 0.05);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use the default amount and threshold with specified channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.unsharpMask(2, 1, Channels.Red);
                other.unsharpMask(2, 1, 1.0, 0.05, Channels.Red);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use undefined channels by default', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.unsharpMask(2, 1, 1.5, 0.1);
                other.unsharpMask(2, 1, 1.5, 0.1, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should sharpen only the specified channels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor('#808080'), 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [180, 180, 180]);
            });

            image.unsharpMask(2, 1, 1.0, 0, Channels.Red);

            expect(image.width).toBe(9);
            expect(image.height).toBe(9);
            image.getPixels(pixels => {
                const pixel = pixels.getPixel(4, 4);
                expect(pixel[0]).toBeGreaterThan(180);
                expect(pixel[1]).toBe(180);
                expect(pixel[2]).toBe(180);
            });
        });
    });

    it('should leave the image unchanged with zero amount', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(original => {
                image.unsharpMask(2, 1, 0, 0);

                expect(image).toEqualImage(original);
            });
        });
    });

    it('should preserve contrast below the threshold', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor('#808080'), 9, 9);
            image.getPixels(pixels => {
                pixels.setPixel(4, 4, [180, 180, 180]);
            });
            image.clone(original => {
                image.unsharpMask(2, 1, 1.0, 1.0);

                expect(image).toEqualImage(original);
            });
        });
    });
});
