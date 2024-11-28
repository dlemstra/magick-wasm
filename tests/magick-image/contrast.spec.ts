/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColor } from '@src/magick-color';
import { TestFiles } from '@test/test-files';

describe('MagickImage#contrast', () => {
    it('should increase the image contrast', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor(25, 25, 25), 2, 1);
            image.getPixels(pixels => {
                pixels.setPixel(1, 0, [230, 230, 230]);
            });

            image.contrast();

            expect(image).toHavePixelWithColor(0, 0, new MagickColor(15, 15, 15));
            expect(image).toHavePixelWithColor(1, 0, new MagickColor(240, 240, 240));
        });
    });
});
