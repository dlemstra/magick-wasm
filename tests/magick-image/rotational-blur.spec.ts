/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#rotationalBlur', () => {
    it('should use the default channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.rotationalBlur(20);
                other.rotationalBlur(20, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should blur pixels around the image center', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 17, 17);
            image.getPixels(pixels => {
                pixels.setPixel(12, 8, [0, 0, 0]);
            });

            image.rotationalBlur(90);

            expect(image.width).toBe(17);
            expect(image.height).toBe(17);
            expect(image).toHavePixelWithColor(8, 8, MagickColors.White);
            image.getPixels(pixels => {
                expect(pixels.getPixel(12, 8)[0]).toBe(213);
                expect(pixels.getPixel(12, 9)[0]).toBe(213);
            });
        });
    });

    it('should only blur the specified channels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 17, 17);
            image.getPixels(pixels => {
                pixels.setPixel(12, 8, [0, 0, 0]);
            });

            image.rotationalBlur(90, Channels.Red);

            image.getPixels(pixels => {
                const pixel = pixels.getPixel(12, 8);
                expect(pixel[0]).toBe(213);
                expect(pixel[1]).toBe(0);
                expect(pixel[2]).toBe(0);
            });
        });
    });
});
