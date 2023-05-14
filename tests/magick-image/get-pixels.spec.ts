// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '../../src/magick-image';
import { PixelCollection } from '../../src/pixels/pixel-collection';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#getPixels', () => {
    it('should dispose pixel instance', () => {
        let pixels = PixelCollection._create(image);
        image.getPixels((p) => {
            pixels = p as PixelCollection;
        });

        expect(() => { pixels._instance }).toThrowError('instance is disposed');
    });
});
