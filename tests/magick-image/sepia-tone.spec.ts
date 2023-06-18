// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '../test-images';
import { MagickColor } from '../../src/magick-color';

describe('MagickImage#sepiaTone', () => {
    it('should apply special effect', () => {
        TestImages.Builtin.logo.use(image => {
            image.sepiaTone();
            expect(image).toHavePixelWithColor(243, 45, new MagickColor('#472400'));
            expect(image).toHavePixelWithColor(394, 394, new MagickColor('#522e00'));
            expect(image).toHavePixelWithColor(477, 373, new MagickColor('#e4bb7c'));
        });
    });
});
