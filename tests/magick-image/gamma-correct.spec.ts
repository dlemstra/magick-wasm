/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImage#gammaCorrect', () => {
    it('should gamma correct the image', () => {
        TestImages.Builtin.rose.use(image => {
            image.clone(other => {
                other.gammaCorrect(2);

                const difference = image.compare(other, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.21576);
            });
        });
    });

    it('should gamma correct the specified channels', () => {
        TestImages.Builtin.rose.use(image => {
            image.clone(other => {
                other.gammaCorrect(2, Channels.Red);

                const difference = image.compare(other, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.10594);
            });
        });
    });
});
