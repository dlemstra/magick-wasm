// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickGeometry } from '../../src/magick-geometry';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#splice', () => {
    it('should splice the background color into the image', () => {
        image.backgroundColor = MagickColors.MediumPurple;
        image.splice(new MagickGeometry(20, 30, 40, 50));
        expect(image).toHavePixelWithColor(19, 29, '#ffffffff');
        expect(image).toHavePixelWithColor(20, 30, '#9370dbff');
        expect(image).toHavePixelWithColor(59, 79, '#9370dbff');
        expect(image).toHavePixelWithColor(60, 80, '#ffffffff');
    });
});
