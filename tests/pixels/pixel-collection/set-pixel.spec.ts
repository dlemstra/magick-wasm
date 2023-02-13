// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { IMagickImage, MagickImage } from '../../../src/magick-image';
import { MagickColors } from '../../../src/magick-colors';
import { PixelCollection } from '../../../src/pixels/pixel-collection';
import '../../custom-matcher';

let image: IMagickImage;
let pixels: PixelCollection;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
    pixels = PixelCollection._create(image);
});

afterEach(() => {
    pixels.dispose();
    image.dispose();
});

describe('PixelCollection#setPixel', () => {
    it('should set the pixels at the specified location', () => {
        const data = [ 0, 0, 0, 0 ];
        pixels.setPixel(1, 0, data);

        expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
        expect(image).toHavePixelWithColor(0, 1, MagickColors.White);
        expect(image).toHavePixelWithColor(1, 0, MagickColors.Black);
        expect(image).toHavePixelWithColor(1, 1, MagickColors.White);
    });
});
