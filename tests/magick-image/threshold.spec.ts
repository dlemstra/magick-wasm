// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '@src/channels';
import { ErrorMetric } from '@src/error-metric';
import { Percentage } from '@src/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#threshold', () => {
    it('should threshold the image with the correct default values', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone((other) => {
                image.threshold(new Percentage(80));
                other.threshold(new Percentage(80), Channels.Undefined);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            });
        });
    });

    it('should threshold the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone((other) => {
                image.threshold(new Percentage(80));

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.165);
            });
        });
    });
});
