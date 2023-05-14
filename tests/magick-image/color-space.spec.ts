// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ColorSpace } from '../../src/color-space';
import { TestImages } from '../test-images';

describe('MagickImage#colorSpace', () => {
    it('should return the color space', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image.colorSpace).toBe(ColorSpace.sRGB);
        });
    });

    it('should change the color space', () => {
        TestImages.Builtin.logo.use(image => {
            image.colorSpace = ColorSpace.CMYK;
            expect(image.colorSpace).toBe(ColorSpace.CMYK);
        });
    });
});
