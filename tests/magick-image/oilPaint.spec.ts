/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImage#oilPaint', () => {
    it('should default to a radius of 3', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.oilPaint();
                other.oilPaint(3.0);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should create an oil paint like image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                other.oilPaint(4.2);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.14);
            });
        });
    });
});
