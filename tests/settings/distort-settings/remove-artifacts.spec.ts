// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DistortSettings } from '@src/settings/distort-settings';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestImages } from '@test/test-images';

describe('DistortSettings#setArtifacts', () => {
    it('should remove the scale artifact from the image', () => {
        TestImages.empty.use((image) => {
            const settings = new DistortSettings();

            settings.scale = 4.5;
            settings._setArtifacts(image);

            settings._removeArtifacts(image);

            expect(image.artifactNames.length).toBe(0);
        });
    });

    it('should remove the viewport artifact from the image', () => {
        TestImages.empty.use((image) => {
            const settings = new DistortSettings();

            settings.viewport = new MagickGeometry(1);
            settings._setArtifacts(image);

            settings._removeArtifacts(image);

            expect(image.artifactNames.length).toBe(0);
        });
    });
});
