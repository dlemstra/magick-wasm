// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColor } from '../../src/magick-color';
import '../custom-matcher';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read(new MagickColor(25, 25, 25), 2, 1);
    image.getPixels(pixels => {
        pixels.setPixel(1, 0, [230, 230, 230]);
    });
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#contrast', () => {
    it('should increase the image contrast', () => {
        image.contrast();

        expect(image).toHavePixelWithColor(0, 0, new MagickColor(15, 15, 15));
        expect(image).toHavePixelWithColor(1, 0, new MagickColor(240, 240, 240));
    });
});
