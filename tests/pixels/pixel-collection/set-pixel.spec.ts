// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { MagickColors } from '../../../src/magick-colors';
import { MagickImage } from '../../../src/magick-image';
import { PixelCollection } from '../../../src/pixels/pixel-collection';
import { colorAssert } from '../../color-assert';

let image: MagickImage;
let pixels: PixelCollection;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
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

        colorAssert(image, 0, 0, MagickColors.White);
        colorAssert(image, 0, 1, MagickColors.White);
        colorAssert(image, 1, 0, MagickColors.Black);
        colorAssert(image, 1, 1, MagickColors.White);
    });
});