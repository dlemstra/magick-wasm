/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { MagickImageCollection } from '@src/magick-image-collection';
import { MagickFormat } from '@src/enums/magick-format';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#flatten', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            const images = MagickImageCollection.create();
            images.flatten(() => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should flatten the images', () => {
        TestImages.roseSparkleGif.use(images => {
            images.flatten(image => {
                expect(image.format).toBe(MagickFormat.Gif);
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);

                const difference = images[0].compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.11919);
            });
        });
    });
});
