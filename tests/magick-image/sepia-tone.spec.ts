/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#sepiaTone', () => {
    it('should apply special effect', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.sepiaTone();
            expect(image).toHavePixelWithColor(243, 45, '#472400');
            expect(image).toHavePixelWithColor(394, 394, '#522e00');
            expect(image).toHavePixelWithColor(477, 373, '#e4bb7c');
        });
    });
    it('should apply special effect with the specified percentage', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.sepiaTone(new Percentage(60));
            expect(image).toHavePixelWithColor(243, 45, '#684400');
            expect(image).toHavePixelWithColor(394, 394, '#775200');
            expect(image).toHavePixelWithColor(477, 373, '#fff359');
        });
    });
    it('should apply special effect with the specified percentage value', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.sepiaTone(40);
            expect(image).toHavePixelWithColor(243, 45, '#a07a00');
            expect(image).toHavePixelWithColor(394, 394, '#b68e00');
            expect(image).toHavePixelWithColor(477, 373, '#ffff23');
        });
    });
});
