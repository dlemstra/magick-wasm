/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickColors } from '@src/magick-colors';

describe('MagickImage#opaque', () => {
    it('should change the target color to the fill color', () => {
        ImageMagick.read(MagickColors.Red, 1, 1, image => {
            image.extent(2, 1, MagickColors.Green);
            image.opaque(MagickColors.Red, MagickColors.Purple);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.Purple);
            expect(image).toHavePixelWithColor(1, 0, MagickColors.Green);
        });
    });
});
