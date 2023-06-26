// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { TestImages } from '../test-images';

describe('MagickImage#solarize', () => {
    it('should solarize the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.solarize();
            expect(image).toHavePixelWithColor(125, 125, MagickColors.Black);
            expect(image).toHavePixelWithColor(122, 143, new MagickColor('#007f7f'));
            expect(image).toHavePixelWithColor(435, 240, new MagickColor('#2e6935'));
        });
    });
});
