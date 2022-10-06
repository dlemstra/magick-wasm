// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#colorFuzz', () => {
    it('should return the color fuzz percentage', () => {
        const { colorFuzz } = image;
        expect(colorFuzz.toDouble()).toBe(0);
    });

    it('should change color fuzz percentage', () => {
        image.colorFuzz = new Percentage(10);
        const { colorFuzz } = image;
        expect(colorFuzz.toDouble()).toBe(10);
    });
});
