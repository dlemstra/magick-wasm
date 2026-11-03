/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#normalize', () => {
    it('should normalize the image', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(new MagickColor(179, 179, 179), 4, 1);
            image.getPixels(pixels => {
                pixels.setPixel(1, 0, [77, 77, 77]);
                pixels.setPixel(2, 0, [0, 0, 255]);
                pixels.setPixel(3, 0, [0, 0, 128]);
            });

            image.normalize();

            expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
            expect(image).toHavePixelWithColor(2, 0, MagickColors.Blue);
            expect(image).toHavePixelWithColor(1, 0, new MagickColor(102, 102, 102));
            expect(image).toHavePixelWithColor(3, 0, new MagickColor(0, 0, 179));
        });
    });

    it('should use the default channels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor(179, 179, 179), 2, 1);
            image.getPixels(pixels => {
                pixels.setPixel(1, 0, [77, 77, 77]);
            });
            image.clone(other => {
                image.normalize();
                other.normalize(Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should only normalize the specified channel', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor(179, 100, 120), 2, 1);
            image.getPixels(pixels => {
                pixels.setPixel(1, 0, [77, 50, 60]);
            });

            image.normalize(Channels.Red);

            expect(image).toHavePixelWithColor(0, 0, new MagickColor(255, 100, 120));
            expect(image).toHavePixelWithColor(1, 0, new MagickColor(0, 50, 60));
        });
    });
});
