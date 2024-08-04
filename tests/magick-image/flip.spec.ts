/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickImage } from '@src/magick-image';
import { TestImages } from '@test/test-images';

describe('MagickImage#flip', () => {
    it('should flip the image', () => {
        TestImages.emptyCollection.use(images => {
            images.push(MagickImage.create(MagickColors.Red, 1, 2));
            images.push(MagickImage.create(MagickColors.Blue, 1, 1));

            images.appendVertically(image => {
                expect(image).toHavePixelWithColor(0, 0, MagickColors.Red);
                expect(image).toHavePixelWithColor(0, 1, MagickColors.Red);
                expect(image).toHavePixelWithColor(0, 2, MagickColors.Blue);

                image.flip();

                expect(image).toHavePixelWithColor(0, 0, MagickColors.Blue);
                expect(image).toHavePixelWithColor(0, 1, MagickColors.Red);
                expect(image).toHavePixelWithColor(0, 2, MagickColors.Red);
            });
        });
    });
});
