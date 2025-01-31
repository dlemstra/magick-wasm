/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#bilateralBlur', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 6);
            expect(image).toHavePixelWithColor(387, 435, '#b5191e');
        });
    });

    it('should use the specified sigma values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 6, 7, 8);
            expect(image).toHavePixelWithColor(387, 435, '#b4191d');
        });
    });
});
