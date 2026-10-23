/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Magick } from '@src/magick';
import { NoiseType } from '@src/enums/noise-type';
import { Percentage } from '@src/types/percentage';
import { Quantum } from '@src/quantum';
import { TestFiles } from '@test/test-files';

describe('MagickImage#waveletDenoise', () => {
    it('should use zero softness by default for quantum thresholds', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.waveletDenoise(Quantum.max * 0.1);
                other.waveletDenoise(Quantum.max * 0.1, 0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use zero softness by default for percentage thresholds', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.waveletDenoise(new Percentage(10));
                other.waveletDenoise(new Percentage(10), 0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should convert percentage thresholds to quantum values', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(other => {
                image.waveletDenoise(new Percentage(10), 0.5);
                other.waveletDenoise(Quantum.max * 0.1, 0.5);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should reduce deterministic noise in the image', () => {
        try {
            Magick.setRandomSeed(12345);
            TestFiles.Images.Builtin.logo.use(image => {
                image.resize(32, 24);
                image.addNoise(NoiseType.Gaussian);

                image.clone(original => {
                    image.waveletDenoise(new Percentage(10), 0.5);

                    expect(image.width).toBe(original.width);
                    expect(image.height).toBe(original.height);
                    expect(image).toEqualImage(original, 0.03278);
                });
            });
        } finally {
            Magick.resetRandomSeed();
        }
    });
});
