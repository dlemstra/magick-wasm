/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#setArtifact', () => {
    it('should change boolean to string', () => {
        const image = new MagickImage();
        image.setArtifact('foo', true);

        const value = image.getArtifact('foo');
        expect(value).toBe('1');
    });

    it('should set the value', () => {
        const image = new MagickImage();
        image.setArtifact('foo', 'bar');

        const value = image.getArtifact('foo');
        expect(value).toBe('bar');
    });
});