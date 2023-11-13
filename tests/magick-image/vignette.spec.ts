// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImage#vignette', () => {
    it('should use the correct default values', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.vignette();
                other.vignette(0.0, 1.0, 0, 0);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should soften the edges of the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                other.vignette(1.4, 2.5, 0, 0);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.379);
            });
        });
    });
});
