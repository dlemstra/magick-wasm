// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#motionBlur', () => {
    it('should change pixels of the image', () => {
        image.motionBlur(100, 10, -90);

        expect(image).toHavePixelWithColor(222, 60, '#ff0d0dff');
    });
});
