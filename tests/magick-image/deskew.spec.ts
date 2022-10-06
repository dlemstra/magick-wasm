// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';
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

describe('MagickImage#deskew', () => {
    it('should rotate the image', () => {
        image.deskew(new Percentage(4.2));

        expect(image).toHavePixelWithColor(158, 16, MagickColors.Black);
    });

    it('should return the angle', () => {
        const angle = image.deskew(new Percentage(42));
        expect(angle).toEqual(0.8951737102110744);
    });
});
