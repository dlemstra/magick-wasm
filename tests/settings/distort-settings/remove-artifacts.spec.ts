// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { MagickGeometry } from '../../../src/magick-geometry';
import { IMagickImage, MagickImage } from '../../../src/magick-image';
import { DistortSettings } from '../../../src/settings/distort-settings';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('DistortSettings#setArtifacts', () => {
    it('should remove the scale artifact from the image', () => {
        const settings = new DistortSettings();

        settings.scale = 4.5;
        settings._setArtifacts(image);

        settings._removeArtifacts(image);

        expect(image.artifactNames.length).toBe(0);
    });

    it('should remove the viewport artifact from the image', () => {
        const settings = new DistortSettings();

        settings.viewport = new MagickGeometry(1);
        settings._setArtifacts(image);

        settings._removeArtifacts(image);

        expect(image.artifactNames.length).toBe(0);
    });
});
