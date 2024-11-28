/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ComplexOperator } from '@src/enums/complex-operator';
import { TemporaryDefines } from '@src/helpers/temporary-defines';
import { ComplexSettings } from '@src/settings/complex-settings';
import { TestFiles } from '@test/test-files';

describe('ComplexSettings', () => {
    const settings = new ComplexSettings(ComplexOperator.Multiply);
    settings.signalToNoiseRatio = 42;

    describe('#_setArtifacts', () => {
        it('should add all defined artifacts to the provided image', () => {
            TestFiles.Images.Builtin.logo.use((image) => {
                TemporaryDefines.use(image, (temporaryDefines) => {
                    settings._setArtifacts(temporaryDefines);

                    expect(settings.complexOperator).toBe(ComplexOperator.Multiply);
                    expect(image.artifactNames.length).toBe(1);
                    expect(image.getArtifact('complex:snr')).toBe('42');
                });
            });
        });
    });
});
