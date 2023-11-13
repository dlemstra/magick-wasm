// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '@src/enums/error-metric';
import { Percentage } from '@src/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#brightnessContrast', () => {
    it('should not change at all', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(0), new Percentage(0));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should change the brightness only', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(50), new Percentage(0));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.18056);
            });
        });
    });

    it('should change both brightness and contrast', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(50), new Percentage(100));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.278);
            });
        });
    });
});
