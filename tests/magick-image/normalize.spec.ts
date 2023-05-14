// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read(new MagickColor(179, 179, 179), 4, 1);
    image.getPixels(pixels => {
        pixels.setPixel(1, 0, [77, 77, 77]);
        pixels.setPixel(2, 0, [0, 0, 255]);
        pixels.setPixel(3, 0, [0, 0, 128]);
    });
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#normalize', () => {
    it('should normalize the image', () => {
        image.normalize();

        expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
        expect(image).toHavePixelWithColor(2, 0, MagickColors.Blue);
        expect(image).toHavePixelWithColor(1, 0, new MagickColor(102, 102, 102));
        expect(image).toHavePixelWithColor(3, 0, new MagickColor(0, 0, 179));
    });
});
