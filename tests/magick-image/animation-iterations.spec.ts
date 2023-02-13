// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#animationIterations', () => {
    it('should return the animation iterations', () => {
        expect(image.animationIterations).toBe(0);
    });

    it('should change the animation iterations', () => {
        image.animationIterations = 10;
        expect(image.animationIterations).toBe(10);
    });
});
