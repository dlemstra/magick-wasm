// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
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

describe('MagickImage#removeArtifact', () => {
    it('should remove the artifact from the image', () => {
        image.setArtifact('foo', true);

        image.removeArtifact('foo');

        const value = image.getArtifact('foo');
        expect(value).toBeNull();
    });
});