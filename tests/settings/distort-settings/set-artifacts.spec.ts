// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DistortSettings } from '../../../src/settings/distort-settings';
import { ImageMagick } from '../../../src/image-magick';
import { IMagickImage, MagickImage } from '../../../src/magick-image';
import { MagickGeometry } from '../../../src/magick-geometry';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('DistortSettings#setArtifacts', () => {
    it('should not add the artifacts to the image when properties are not set', () => {
        const settings = new DistortSettings();

        settings._setArtifacts(image);

        expect(image.artifactNames.length).toBe(0);
    });

    it('should add the scale artifact to the image', () => {
        const settings = new DistortSettings();

        settings.scale = 4.5;
        settings._setArtifacts(image);

        expect(image.getArtifact('distort:scale')).toBe('4.5');
    });

    it('should add the viewport artifact to the image', () => {
        const settings = new DistortSettings();

        settings.viewport = new MagickGeometry(1, 2, 3, 4);
        settings._setArtifacts(image);

        expect(image.getArtifact('distort:viewport')).toBe('3x4+1+2');
    });
});
