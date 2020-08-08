/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { DistortSettings } from '../../../src/settings/distort-settings';
import { ImageMagick } from '../../../src/image-magick';
import { MagickImage } from '../../../src/magick-image';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('DistortSettings#setArtifacts', () => {
    it('should remove the artifacts from the image', () => {
        const image = new MagickImage();
        const settings = new DistortSettings();

        settings.scale = 4.5;
        settings._setArtifacts(image);

        settings._removeArtifacts(image);

        expect(image.getArtifact('distort:scale')).toBe(null);
    });
});