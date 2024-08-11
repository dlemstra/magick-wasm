/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { QuantizeSettings } from '@src/settings/quantize-settings';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#flatten', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            expect(() => {
                images.quantize();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should return null when measureErrors is not true', () => {
        TestImages.roseSparkleGif.use(images => {
            const result = images.quantize();

            expect(result).toBeNull();
        });
    });

    it('should quantize the images', () => {
        TestImages.roseSparkleGif.use(images => {
            const settings = new QuantizeSettings
            {
                settings.colors = 3;
                settings.measureErrors = true;
            };

            const result = images.quantize(settings);

            expect(result).not.toBeNull();

            TestImages.roseSparkleGif.use(original => {
                expect(images[0].compare(original[0], ErrorMetric.RootMeanSquared)).toBeCloseTo(0.18152);
                expect(images[1].compare(original[1], ErrorMetric.RootMeanSquared)).toBeCloseTo(0.14315);
                expect(images[2].compare(original[2], ErrorMetric.RootMeanSquared)).toBeCloseTo(0.14822);
            });
        });
    });
});
