/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickReadSettings#frameCount', () => {
    it('should only read the specified number of images of the collection', () => {
        const settings = new MagickReadSettings();
        settings.frameCount = 2;

        ImageMagick.readCollection(TestFiles.Images.roseSparkleGif.data, settings, images => {
            expect(images.length).toBe(2);
            TestFiles.Images.roseSparkleGif.use(collection => {
                expect(images[0]).toEqualImage(collection[0]);
                expect(images[1]).toEqualImage(collection[1]);
            });
        });
    });

    it('should only read the available number of frames', () => {
        const settings = new MagickReadSettings();
        settings.frameCount = 42;

            ImageMagick.readCollection(TestFiles.Images.roseSparkleGif.data, settings, collection => {
                expect(collection.length).toBe(3);
            });
    });

    it('should read the specified number of frames from the specified starting index', () => {
        const settings = new MagickReadSettings();
        settings.frameIndex = 1;
        settings.frameCount = 2;

        ImageMagick.readCollection(TestFiles.Images.roseSparkleGif.data, settings, images => {
            expect(images.length).toBe(2);
            TestFiles.Images.roseSparkleGif.use(collection => {
                expect(images[0]).toEqualImage(collection[1]);
                expect(images[1]).toEqualImage(collection[2]);
            });
        });
    });

    it('should throw exception when the frame index is more than 1 and a single image is being read', () => {
        const settings = new MagickReadSettings();
        settings.frameCount = 2;

        expect(() => {
            ImageMagick.read(TestFiles.Images.roseSparkleGif.data, settings, () => {});
        })
        .toThrowError('The frame count can only be set to 1 when a single image is being read.');
    });
});
