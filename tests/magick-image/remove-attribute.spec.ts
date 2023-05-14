// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#removeAttribute', () => {
    it('should remove the attribute from the image', () => {
        image.setAttribute('foo', 'bar');

        image.removeAttribute('foo');

        const value = image.getAttribute('foo');
        expect(value).toBeNull();
    });
});
