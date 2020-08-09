/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { DistortSettings } from '../../../src/settings/distort-settings';
import { ImageMagick } from '../../../src/image-magick';
import { MagickImage } from '../../../src/magick-image';
import { MagickGeometry } from '../../../src/magick-geometry';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('DistortSettings#setArtifacts', () => {
    it('should remove the scale artifact from the image', () => {
        const image = MagickImage.create();
        const settings = new DistortSettings();

        settings.scale = 4.5;
        settings._setArtifacts(image);

        settings._removeArtifacts(image);

        expect(image.artifactNames.length).toBe(0);
    });

    it('should remove the viewport artifact from the image', () => {
        const image = MagickImage.create();
        const settings = new DistortSettings();

        settings.viewport = new MagickGeometry(1);
        settings._setArtifacts(image);

        settings._removeArtifacts(image);

        expect(image.artifactNames.length).toBe(0);
    });
});