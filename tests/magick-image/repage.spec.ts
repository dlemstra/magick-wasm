// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickGeometry } from '../../src/magick-geometry';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#repage', () => {
    it('should reset the page', () => {
        image.page = new MagickGeometry(1, 2, 3, 4);

        image.repage();

        const { page } = image;
        expect(page.x).toBe(0);
        expect(page.y).toBe(0);
        expect(page.width).toBe(0);
        expect(page.height).toBe(0);
    });
});
