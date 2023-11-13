// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '@src/magick-colors';
import { MagickImage } from '@src/magick-image';
import { TestImages } from '@test/test-images';

describe('MagickImage#flop', () => {
    it('should flop the image', () => {
        TestImages.emptyCollection.use(images => {
            images.push(MagickImage.create(MagickColors.Red, 2, 1));
            images.push(MagickImage.create(MagickColors.Blue, 1, 1));

            images.appendHorizontally(image => {
                expect(image).toHavePixelWithColor(0, 0, MagickColors.Red);
                expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
                expect(image).toHavePixelWithColor(2, 0, MagickColors.Blue);

                image.flop();

                expect(image).toHavePixelWithColor(0, 0, MagickColors.Blue);
                expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
                expect(image).toHavePixelWithColor(2, 0, MagickColors.Red);
            });
        });
    });
});
