// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickGeometry } from '../../src/magick-geometry';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#page', () => {
    it('should return the default value', () => {
        const page = image.page;
        expect(page.x).toBe(0);
        expect(page.y).toBe(0);
        expect(page.width).toBe(0);
        expect(page.height).toBe(0);
    });

    it('should set the correct properties', () => {
        image.page = new MagickGeometry(1, 2, 3, 4);

        const page = image.page;
        expect(page.x).toBe(1);
        expect(page.y).toBe(2);
        expect(page.width).toBe(3);
        expect(page.height).toBe(4);
    });
});
