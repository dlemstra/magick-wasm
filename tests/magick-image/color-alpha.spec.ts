/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#colorAlpha', () => {
    it('should color the alpha channel', () => {
        TestFiles.Images.redPng.use(image => {
            image.colorAlpha(MagickColors.Magenta);
            expect(image).toHavePixelWithColor(350, 80, MagickColors.Magenta);
        });
    });
});
