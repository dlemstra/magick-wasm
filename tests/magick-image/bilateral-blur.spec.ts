/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#bilateralBlur', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 5);
            expect(image).toHavePixelWithColor(387, 435, '#b2191dff');
        });
    });

    it('should use the specified sigma values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.bilateralBlur(5, 5, 10, 10);
            expect(image).toHavePixelWithColor(387, 435, '#c11b1fff');
        });
    });
});
