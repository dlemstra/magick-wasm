// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#artifactNames', () => {
    it('should return empty array when image has not attributes', () => {
        const names = image.artifactNames;

        expect(names).not.toBeNull();
        expect(names.length).toBe(0);
    });

    it('should return the artifact names of the image', () => {
        image.setArtifact('foo', true);

        const names = image.artifactNames;

        expect(names).not.toBeNull();
        expect(names.length).toBe(1);
        expect(names[0]).toBe('foo');
    });
});