// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { PixelInterpolateMethod } from '../../src/pixel-interpolate-method';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#interpolate', () => {
    it('should return the correct default value', () => {
        expect(image.interpolate).toBe(PixelInterpolateMethod.Undefined);
    });

    it('should return the correct value after it has been changed', () => {
        image.interpolate = PixelInterpolateMethod.Blend;
        expect(image.interpolate).toBe(PixelInterpolateMethod.Blend);
    });
});
