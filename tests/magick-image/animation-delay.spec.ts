// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#animationDelay', () => {
    it('should return the animation delay', () => {
        expect(image.animationDelay).toBe(0);
    });

    it('should change the animation delay', () => {
        image.animationDelay = 10;
        expect(image.animationDelay).toBe(10);
    });
});
