// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#comment', () => {
    it('should have null as default value', () => {
        expect(image.comment).toBeNull();
    });

    it('should set the comment attribute', () => {
        image.comment = 'foo';
        expect(image.comment).toBe('foo');
        expect(image.getAttribute('comment')).toBe('foo');
    });
});
