// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#setArtifact', () => {
    it('should change boolean to string', () => {
        image.setArtifact('foo', true);

        const value = image.getArtifact('foo');
        expect(value).toBe('1');
    });

    it('should set the value', () => {
        image.setArtifact('foo', 'bar');

        const value = image.getArtifact('foo');
        expect(value).toBe('bar');
    });
});
