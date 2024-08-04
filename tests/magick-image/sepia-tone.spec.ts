/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColor } from '@src/magick-color';
import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#sepiaTone', () => {
    it('should apply special effect', () => {
        TestImages.Builtin.logo.use(image => {
            image.sepiaTone();
            expect(image).toHavePixelWithColor(243, 45, new MagickColor('#472400'));
            expect(image).toHavePixelWithColor(394, 394, new MagickColor('#522e00'));
            expect(image).toHavePixelWithColor(477, 373, new MagickColor('#e4bb7c'));
        });
    });
    it('should apply special effect with the specified percentage', () => {
        TestImages.Builtin.logo.use(image => {
            image.sepiaTone(new Percentage(60));
            expect(image).toHavePixelWithColor(243, 45, new MagickColor('#684400'));
            expect(image).toHavePixelWithColor(394, 394, new MagickColor('#775200'));
            expect(image).toHavePixelWithColor(477, 373, new MagickColor('#fff359'));
        });
    });
    it('should apply special effect with the specified percentage value', () => {
        TestImages.Builtin.logo.use(image => {
            image.sepiaTone(40);
            expect(image).toHavePixelWithColor(243, 45, new MagickColor('#a07a00'));
            expect(image).toHavePixelWithColor(394, 394, new MagickColor('#b68e00'));
            expect(image).toHavePixelWithColor(477, 373, new MagickColor('#ffff23'));
        });
    });
});
