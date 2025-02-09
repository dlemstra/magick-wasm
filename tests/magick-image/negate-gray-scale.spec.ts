/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { AlphaAction } from '@src/enums/alpha-action';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#negateGrayScale', () => {
    it('should only negate grayscale', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(MagickColors.Black, 2, 1);

            image.getPixels(pixels => {
                pixels.setPixel(1, 0, [255, 0, 0]);
            })

            image.negateGrayScale();

            expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
            expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
        });
    });

    it('should only negate grascale on specified channels', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(MagickColors.White, 2, 1);
            image.alpha(AlphaAction.Opaque);

            image.getPixels(pixels => {
                pixels.setPixel(1, 0, [255, 0, 0]);
            })

            image.negateGrayScale(Channels.All);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.Transparent);
            expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
        });
    });
});
