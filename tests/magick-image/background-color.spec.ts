// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#backgroundColor', () => {
    it('should return the background color of the image', () => {
        const { backgroundColor } = image;
        expect(backgroundColor.r).toBe(255);
        expect(backgroundColor.g).toBe(255);
        expect(backgroundColor.b).toBe(255);
        expect(backgroundColor.a).toBe(255);
    });

    it('should change background color', () => {
        image.backgroundColor = MagickColors.Black;
        const { backgroundColor } = image;
        expect(backgroundColor.r).toBe(0);
        expect(backgroundColor.g).toBe(0);
        expect(backgroundColor.b).toBe(0);
        expect(backgroundColor.a).toBe(255);
    });
});
