/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestImages } from '@test/test-images';

describe('MagickReadSettings#frameIndex', () => {
    it('should only read the specified index of the collection', () => {
        const settings = new MagickReadSettings();
        settings.frameIndex = 1;

        ImageMagick.read(TestImages.roseSparkleGif.data, settings, image => {
            TestImages.roseSparkleGif.use(collection => {
                expect(image).toEqualImage(collection[1]);
            });
        });
    });

    it('should throw exception when the frame index is invalid', () => {
        const settings = new MagickReadSettings();
        settings.frameIndex = 42;

        expect(() => {
            ImageMagick.read(TestImages.roseSparkleGif.data, settings, () => {});
        })
        .toThrowError('InvalidImageIndex');
    });
});
