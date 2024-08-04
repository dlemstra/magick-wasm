/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { TestImages } from '@test/test-images';

describe('MagickImage#interpolate', () => {
    it('should return the correct default value', () => {
        TestImages.empty.use(image => {
            expect(image.interpolate).toBe(PixelInterpolateMethod.Undefined);
        });
    });

    it('should return the correct value after it has been changed', () => {
        TestImages.empty.use(image => {
            image.interpolate = PixelInterpolateMethod.Blend;
            expect(image.interpolate).toBe(PixelInterpolateMethod.Blend);
        });
    });
});
