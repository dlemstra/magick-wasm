/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImage#sharpen', () => {
    it('should use correct defaults for radius and sigma.', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                image.sharpen();
                other.sharpen(0, 1.0);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should use composite as default channels', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                image.sharpen(1.0, 1.0);
                other.sharpen(1.0, 1.0, Channels.Composite);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should sharpen the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(original => {
                image.sharpen(10, 20);

                const difference = original.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.0395);
            });
        });
    });
});
