// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ConnectedComponentsSettings } from '@src/settings/connected-components-settings';
import { Threshold } from '@src/threshold';
import { TestImages } from '@test/test-images';

describe('ConnectedComponentsSettings', () => {
    const settings = new ConnectedComponentsSettings(4);

    settings.angleThreshold = new Threshold(10);
    settings.areaThreshold = new Threshold(20);
    settings.circularityThreshold = new Threshold(30);
    settings.diameterThreshold = new Threshold(40);
    settings.eccentricityThreshold = new Threshold(50);
    settings.majorAxisThreshold = new Threshold(60);
    settings.meanColor = true;
    settings.minorAxisThreshold = new Threshold(70);
    settings.perimeterThreshold = new Threshold(80);

    describe('#_addArtifacts', () => {
        it('should add all defined artifacts to the provided image', () => {
            TestImages.Builtin.logo.use((image) => {
                settings._setArtifacts(image);

                expect(image.artifactNames.length).toBe(9);
                expect(image.getArtifact('connected-components:angle-threshold')).toBe('10');
                expect(image.getArtifact('connected-components:area-threshold')).toBe('20');
                expect(image.getArtifact('connected-components:circularity-threshold')).toBe('30');
                expect(image.getArtifact('connected-components:diameter-threshold')).toBe('40');
                expect(image.getArtifact('connected-components:eccentricity-threshold')).toBe('50');
                expect(image.getArtifact('connected-components:major-axis-threshold')).toBe('60');
                expect(image.getArtifact('connected-components:mean-color')).toBe('true');
                expect(image.getArtifact('connected-components:minor-axis-threshold')).toBe('70');
                expect(image.getArtifact('connected-components:perimeter-threshold')).toBe('80');
            });
        });
    });

    describe('#_removeArtifacts', () => {
        it('should remove all undefined artifacts from the provided image', () => {
            TestImages.Builtin.logo.use((image) => {
                settings._setArtifacts(image);
                expect(image.artifactNames.length).toBe(9);

                settings._removeArtifacts(image);
                expect(image.artifactNames.length).toBe(0);
            });
        });
    });
});
