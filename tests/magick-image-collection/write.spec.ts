// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '@src/magick-format';
import { MagickImageCollection, IMagickImageCollection } from '@src/magick-image-collection';
import { TestImages } from '@test/test-images';

let images: IMagickImageCollection;

beforeEach(() => {
    images = MagickImageCollection.create();
});

afterEach(() => {
    images.dispose();
});

describe('MagickImageCollection#write', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            images.write(() => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should write images to array', () => {
        images.read(TestImages.roseSparkleGif.data);

        images.write(newData => {
            images.dispose();
            images.read(newData);

            expect(images.length).toBe(3);
        });
    });

    it('should write images to array in the specified format', () => {
        images.read(TestImages.roseSparkleGif.data);

        images.write(MagickFormat.Tiff, newData => {
            images.dispose();
            images.read(newData);

            expect(images.length).toBe(3);
            expect(images[0].format).toBe(MagickFormat.Tiff);
        });
    });
});
