// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import '../custom-matcher';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#histogram', () => {
    it('should return a histogram of the image', () => {
        const histogram = image.histogram();

        expect(histogram).not.toBeNull();
        expect(histogram.size).toBe(256);
        expect(histogram.get(MagickColors.Red.toString())).toBe(2942);
        expect(histogram.get(MagickColors.White.toString())).toBe(256244);
    });
});
