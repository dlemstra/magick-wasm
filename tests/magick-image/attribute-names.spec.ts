// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#attributeNames', () => {
    it('should return empty array when image has not attributes', () => {
        const names = image.attributeNames;

        expect(names).not.toBeNull();
        expect(names.length).toBe(0);
    });

    it('should return the attributes names of the image', () => {
        image.setAttribute('foo', 'bar');

        const names = image.attributeNames;

        expect(names).not.toBeNull();
        expect(names.length).toBe(1);
        expect(names[0]).toBe('foo');
    });
});
