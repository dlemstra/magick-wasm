// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '@src/enums/error-metric';
import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#clache', () => {
    it('should change pixels of the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(clone => {
                clone.clahe(50, 100, 128, 3);
                const difference = clone.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.017);
            });
        });
    });

    it('should change pixels of the image with a percentage', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(clone => {
                clone.clahe(new Percentage(50), new Percentage(10), 128, 3);
                const difference = clone.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.012);
            });
        });
    });
});
