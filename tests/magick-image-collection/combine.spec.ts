/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { ErrorMetric } from '@src/enums/error-metric';
import { MagickImageCollection } from '@src/magick-image-collection';
import { MagickFormat } from '@src/enums/magick-format';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#combine', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            const images = MagickImageCollection.create();
            images.combine(() => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should combine the channels into an image', () => {
        TestImages.redPng.use(image => {
            image.separate(images => {
                images.combine(combinedImage => {
                    expect(combinedImage.format).toBe(MagickFormat.Png);
                    expect(combinedImage.width).toBe(image.width);
                    expect(combinedImage.height).toBe(image.height);

                    expect(image.compare(combinedImage, ErrorMetric.RootMeanSquared)).toBe(0);
                });
            })
        });
    });

    it('should combine the channels using the specified colorspace into an image', () => {
        TestImages.cmykJpg.use(image => {
            image.separate(images => {
                images.combine(ColorSpace.CMYK, combinedImage => {
                    expect(combinedImage.format).toBe(MagickFormat.Jpeg);
                    expect(combinedImage.width).toBe(image.width);
                    expect(combinedImage.height).toBe(image.height);

                    expect(image.compare(combinedImage, ErrorMetric.RootMeanSquared)).toBe(0);
                });
            })
        });
    });
});
