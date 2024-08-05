/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { TemporaryDefines } from '@src/helpers/temporary-defines';
import { MagickColors } from '@src/magick-colors';
import { CompareSettings } from '@src/settings/compare-settings';
import { TestImages } from '@test/test-images';

describe('CompareSettings', () => {
    const settings = new CompareSettings(ErrorMetric.NormalizedCrossCorrelation);
    settings.highlightColor = MagickColors.Honeydew;
    settings.lowlightColor = MagickColors.LemonChiffon;
    settings.masklightColor = MagickColors.Moccasin;

    describe('#_setArtifacts', () => {
        it('should add all defined artifacts to the provided image', () => {
            TestImages.Builtin.logo.use((image) => {
                TemporaryDefines.use(image, (temporaryDefines) => {
                    settings._setArtifacts(temporaryDefines);

                    expect(settings.metric).toBe(ErrorMetric.NormalizedCrossCorrelation);
                    expect(image.artifactNames.length).toBe(3);
                    expect(image.getArtifact('compare:highlight-color')).toBe('#f0fff0ff');
                    expect(image.getArtifact('compare:lowlight-color')).toBe('#fffacdff');
                    expect(image.getArtifact('compare:masklight-color')).toBe('#ffe4b5ff');
                });
            });
        });
    });
});
