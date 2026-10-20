/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#transpose', () => {
    it('should create a horizontal mirror image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.transpose();

            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
            expect(image).toHavePixelWithColor(61, 292, MagickColors.Red);
            expect(image).toHavePixelWithColor(104, 377, new MagickColor('#f5f5eeee3636'));
            expect(image).toHavePixelWithColor(442, 391, new MagickColor('#eded1f1f2424'));
        });
    });
});
