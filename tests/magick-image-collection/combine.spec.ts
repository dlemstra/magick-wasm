/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { ErrorMetric } from '@src/enums/error-metric';
import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#combine', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.combine(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should combine the channels into an image', () => {
        TestFiles.Images.redPng.use(image => {
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
        TestFiles.Images.cmykJpg.use(image => {
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
