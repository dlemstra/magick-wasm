/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#merge', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            expect(() => {
                images.merge(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should merge the images', () => {
        TestImages.roseSparkleGif.use(roses => {
            TestImages.imageMagickJpg.use(imageMagickJpg => {

                roses.unshift(imageMagickJpg);

                roses.merge(image => {
                    expect(image.width).toBe(imageMagickJpg.width);
                    expect(image.height).toBe(imageMagickJpg.height);

                    const difference = roses[0].compare(image, ErrorMetric.RootMeanSquared);
                    expect(difference).toBeCloseTo(0.27456);
                });
            });
        });
    });
});
