/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { ErrorMetric } from '@src/enums/error-metric';
import { ImageMagick } from '@src/image-magick';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#colorSpace', () => {
    it('should use the correct color space', () => {
        const settings = new MagickReadSettings();

        ImageMagick.read(TestFiles.Images.imageMagickJpg.data, settings, (imageA) => {
            settings.colorSpace = ColorSpace.Rec601YCbCr;
            ImageMagick.read(TestFiles.Images.imageMagickJpg.data, settings, (imageB) => {
                const distortion = imageA.compare(imageB, ErrorMetric.RootMeanSquared);
                expect(distortion).not.toBe(0);
            });
        });
    });
});
