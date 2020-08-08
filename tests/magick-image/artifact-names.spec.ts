/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#artifactNames', () => {
    it('should return empty array when image has not attributes', () => {
        const image = new MagickImage();

        const names = image.artifactNames;

        expect(names).not.toBeNull();
        expect(names.length).toBe(0);
    });

    it('should return the artifact names of the image', () => {
        const image = new MagickImage();
        image.setArtifact('foo', true);

        const names = image.artifactNames;

        expect(names).not.toBeNull();
        expect(names.length).toBe(1);
        expect(names[0]).toBe('foo');
    });
});