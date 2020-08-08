/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#removeArtifact', () => {
    it('should remove the artifact from the image', () => {
        const settings = new MagickReadSettings(
        {
            width: 1
        });

        const image = new MagickImage();
        image.setArtifact('foo', true);

        image.removeArtifact('foo');

        const value = image.getArtifact('foo');
        expect(value).toBe(null);
    });
});