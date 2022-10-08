// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read(MagickColors.Black, 1, 1);
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#border', () => {
    it('should surround the image on all sides equally', () => {
        image.border(2);

        expect(image.width).toBe(5);
        expect(image.height).toBe(5);
    });

    it('should surround the image with different widths for each axis', () => {
        image.border(2, 3);

        expect(image.width).toBe(5);
        expect(image.height).toBe(7);
    });
});
