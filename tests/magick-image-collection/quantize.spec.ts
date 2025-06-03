/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { QuantizeSettings } from '@src/settings/quantize-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#quantize', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.quantize();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should return null when measureErrors is not true', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            const result = images.quantize();

            expect(result).toBeNull();
        });
    });

    it('should quantize the images', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            const settings = new QuantizeSettings
            {
                settings.colors = 3;
                settings.measureErrors = true;
            };

            const result = images.quantize(settings);

            expect(result).not.toBeNull();

            TestFiles.Images.roseSparkleGif.use(original => {
                expect(images[0]).toEqualImage(original[0], 0.18152);
                expect(images[1]).toEqualImage(original[1], 0.14315);
                expect(images[2]).toEqualImage(original[2], 0.14823);
            });
        });
    });
});
