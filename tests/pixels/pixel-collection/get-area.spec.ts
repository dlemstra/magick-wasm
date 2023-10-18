// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '@src/magick-image';
import { PixelCollection } from '@src/pixels/pixel-collection';

let image: IMagickImage;
let pixels: PixelCollection;

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
    pixels = PixelCollection._create(image);
});

afterEach(() => {
    pixels.dispose();
    image.dispose();
});

describe('PixelCollection#getArea', () => {
    it('should return array with the correct size', () => {
        const data = pixels.getArea(0, 0, 4, 5);
        expect(data).not.toBeNull();
        expect(data.length).toBe(80);
    });
});
