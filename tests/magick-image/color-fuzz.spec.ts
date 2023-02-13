// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#colorFuzz', () => {
    it('should return the color fuzz percentage', () => {
        const colorFuzz = image.colorFuzz;
        expect(colorFuzz.toDouble()).toBe(0);
    });

    it('should change color fuzz percentage', () => {
        image.colorFuzz = new Percentage(10);
        const colorFuzz = image.colorFuzz;
        expect(colorFuzz.toDouble()).toBe(10);
    });
});
