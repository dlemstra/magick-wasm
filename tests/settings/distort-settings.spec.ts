/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DistortMethod } from '@src/enums/distort-method';
import { TemporaryDefines } from '@src/helpers/temporary-defines';
import { DistortSettings } from '@src/settings/distort-settings';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestImages } from '@test/test-images';

describe('DistortSettings', () => {
    const settings = new DistortSettings(DistortMethod.Perspective);
    settings.scale = 42;
    settings.viewport = new MagickGeometry(1, 2, 3, 4);

    describe('#_setArtifacts', () => {
        it('should add all defined artifacts to the provided image', () => {
            TestImages.Builtin.logo.use((image) => {
                TemporaryDefines.use(image, (temporaryDefines) => {
                    settings._setArtifacts(temporaryDefines);

                    expect(settings.method).toBe(DistortMethod.Perspective);
                    expect(image.artifactNames.length).toBe(2);
                    expect(image.getArtifact('distort:scale')).toBe('42');
                    expect(image.getArtifact('distort:viewport')).toBe('3x4+1+2');
                });
            });
        });
    });
});
