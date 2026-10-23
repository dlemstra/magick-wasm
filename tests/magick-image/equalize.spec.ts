/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#equalize', () => {
    it('should equalize only the specified channels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Black, 3, 1);
            image.getPixels(pixels => {
                pixels.setPixel(0, 0, [64, 32, 16]);
                pixels.setPixel(1, 0, [128, 64, 32]);
                pixels.setPixel(2, 0, [192, 96, 48]);
            });

            image.equalize(Channels.Red);

            expect(image).toHavePixelWithColor(0, 0, '#552010');
            expect(image).toHavePixelWithColor(1, 0, '#aa4020');
            expect(image).toHavePixelWithColor(2, 0, '#ff6030');
        });
    });

    it('should apply histogram equalization to the image', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(original => {
                image.equalize();

                expect(image).toEqualImage(original, 0.17011);
            });
        });
    });

    it('should use the correct default channels', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(other => {
                image.equalize();
                other.equalize(Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });
});
