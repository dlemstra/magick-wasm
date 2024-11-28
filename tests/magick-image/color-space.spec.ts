/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { TestFiles } from '@test/test-files';

describe('MagickImage#colorSpace', () => {
    it('should return the color space', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.colorSpace).toBe(ColorSpace.sRGB);
        });
    });

    it('should change the color space', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.colorSpace = ColorSpace.CMYK;
            expect(image.colorSpace).toBe(ColorSpace.CMYK);
        });
    });
});
