/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#removeArtifact', () => {
    it('should remove the artifact from the image', () => {
        const image = new MagickImage();
        image.setArtifact('foo', true);

        image.removeArtifact('foo');

        const value = image.getArtifact('foo');
        expect(value).toBeNull();
    });
});