// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ColorSpace } from '@src/color-space';
import { ErrorMetric } from '@src/error-metric';
import { ImageMagick } from '@src/image-magick';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestImages } from '@test/test-images';

describe('MagickSettings#colorSpace', () => {
    it('should use the correct color space', () => {
        const settings = new MagickReadSettings();

        ImageMagick.read(TestImages.imageMagickJpg.data, settings, (imageA) => {
            settings.colorSpace = ColorSpace.Rec601YCbCr;
            ImageMagick.read(TestImages.imageMagickJpg.data, settings, (imageB) => {
                const distortion = imageA.compare(imageB, ErrorMetric.RootMeanSquared);
                expect(distortion).not.toBe(0);
            });
        });
    });
});
