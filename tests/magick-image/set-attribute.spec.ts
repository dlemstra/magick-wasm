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

describe('MagickImage#setAttribute', () => {
    it('should set the value', () => {
        image.setAttribute('foo', 'bar');

        const value = image.getAttribute('foo');
        expect(value).toBe('bar');
    });
});
