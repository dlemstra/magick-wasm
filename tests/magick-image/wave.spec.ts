// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '@src/enums/error-metric';
import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { TestImages } from '@test/test-images';

describe('MagickImage#wave', () => {
    it('should use the correct default values', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.interpolate = PixelInterpolateMethod.Blend;
                image.wave();

                other.wave(PixelInterpolateMethod.Blend, 25.0, 150.0);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should wave the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                other.wave(PixelInterpolateMethod.Mesh, 140, 40);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.627);
            });
        });
    });
});
