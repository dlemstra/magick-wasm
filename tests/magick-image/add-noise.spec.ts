/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { Magick } from '@src/magick';
import { NoiseType } from '@src/enums/noise-type';
import { TestImages } from '@test/test-images';

describe('MagickImage#addNoise', () => {
    Magick.setRandomSeed(12345);

    afterAll(() => {
        Magick.resetRandomSeed();
    });

    const noiseTypes = Object.keys(NoiseType)
        .filter(key => isNaN(Number(key)));

    const expectedDistortions: Record<string, number> = {
        ['Undefined']: 0.00364,
        ['Uniform']: 0.00364,
        ['Gaussian']: 0.05836,
        ['MultiplicativeGaussian']: 0.16697,
        ['Impulse']: 0.21766,
        ['Laplacian']: 0.04055,
        ['Poisson']: 0.18611,
        ['Random']: 0.55718,
    };

    test.each(noiseTypes)('should add %s noise to the image', (noiseType) => {
        TestImages.Builtin.logo.use(image => {
            image.addNoise(NoiseType[noiseType as keyof typeof NoiseType]);

            TestImages.Builtin.logo.use(original => {
                expect(image).toEqualImage(original, expectedDistortions[noiseType]);
            });
        });
    });

    const expectedChannelDistortions: Record<string, number> = {
        ['Undefined']: 0.08142,
        ['Uniform']: 0.08142,
        ['Gaussian']: 0.36423,
        ['MultiplicativeGaussian']: 0.37922,
        ['Impulse']: 0.53855,
        ['Laplacian']: 0.32653,
        ['Poisson']: 0.01736,
        ['Random']: 0.16216,
    };

    test.each(noiseTypes)('should add %s noise to the image with the specified channel', (noiseType) => {
        TestImages.Builtin.logo.use(image => {
            image.addNoise(NoiseType[noiseType as keyof typeof NoiseType], 42, Channels.Blue);

            TestImages.Builtin.logo.use(original => {
                expect(image).toEqualImage(original, expectedChannelDistortions[noiseType]);
            });
        });
    });

    const expectedAttenuateDistortions: Record<string, number> = {
        ['Undefined']: 0.00210,
        ['Uniform']: 0.00210,
        ['Gaussian']: 0.03371,
        ['MultiplicativeGaussian']: 0.09586,
        ['Impulse']: 0.12542,
        ['Laplacian']: 0.02344,
        ['Poisson']: 0.10673,
        ['Random']: 0.32099,
    };

    test.each(noiseTypes)('should add %s noise to the image with the specified attenuate', (noiseType) => {
        TestImages.Builtin.logo.use(image => {
            image.addNoise(NoiseType[noiseType as keyof typeof NoiseType], 42);

            TestImages.Builtin.logo.use(original => {
                expect(image).toEqualImage(original, expectedAttenuateDistortions[noiseType]);
            });
        });
    });
});
