// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#label', () => {
    it('should have null as default value', () => {
        expect(image.label).toBeNull();
    });

    it('should set the label attribute', () => {
        image.label = 'foo';
        expect(image.label).toBe('foo');
        expect(image.getAttribute('label')).toBe('foo');
    });
});
