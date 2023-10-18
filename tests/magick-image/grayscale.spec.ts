// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '@src/error-metric';
import { PixelChannel } from '@src/pixel-channel';
import { PixelIntensityMethod } from '@src/pixel-intensity-method';
import { TestImages } from '@test/test-images';

describe('MagickImage#grayscale', () => {
    it('should use the default pixel intensity method', () => {
        TestImages.Color.purple.use(imageA => {
            TestImages.Color.purple.use(imageB => {
                imageA.grayscale();
                assert.equal(imageA.channelCount, 1);
                assert.equal(PixelChannel.Red, imageA.channels.at(0));

                imageB.grayscale(PixelIntensityMethod.Brightness);
                assert.equal(imageB.channelCount, 1);
                assert.equal(PixelChannel.Red, imageB.channels.at(0));

                assert.notEqual(0.0, imageA.compare(imageB, ErrorMetric.RootMeanSquared));
            });
        });
    });
});
