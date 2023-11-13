// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '@src/channels';
import { ErrorMetric } from '@src/error-metric';
import { Percentage } from '@src/percentage';
import { Quantum } from '@src/quantum';
import { TestImages } from '@test/test-images';

describe('MagickImage#sigmoidalContrast', () => {
    it('should use half of quantum for midpoint by default', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.sigmoidalContrast(4.0);
                other.sigmoidalContrast(4.0, new Percentage(50));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should adjust the image contrast', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                other.sigmoidalContrast(4.0, new Percentage(25));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.04179);
            });
        });
    });

    it('should adjust the specified channel', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                other.sigmoidalContrast(4.0, Quantum.max * 0.25, Channels.Blue);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.03082);
            });
        });
    });
});
