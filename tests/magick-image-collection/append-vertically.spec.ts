// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickImageCollection } from '../../src/magick-image-collection';
import { TestImages } from '../test-images';

describe('MagickImageCollection#appendVertically', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            const images = MagickImageCollection.create();
            images.appendVertically(() => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should create a new image with the images appended vertically', () => {
        TestImages.roseSparkleGif.use(images => {
            images.appendVertically(image => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(138);
            });
        });
    });
});
