// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImageCollection, MagickImageCollection } from '../../src/magick-image-collection';
import { MagickFormat } from '../../src/magick-format';
import { TestFiles } from '../test-files';

let images: IMagickImageCollection;

beforeEach(() => {
    ImageMagick._api = global.native;
    images = MagickImageCollection.create();
});

afterEach(() => {
    images.dispose();
});

describe('MagickImageCollection#read', () => {
    it('should read built-in image', () => {
        images.read('logo:');

        expect(images.length).toBe(1);
        expect(images[0].width).toBe(640);
        expect(images[0].height).toBe(480);
    });

    it('should read images from array', () => {
        const data = TestFiles.roseSparkleGif.toBufferSync();
        images.read(data);

        expect(images.length).toBe(3);
        images.forEach(image => {
            expect(image.format).toBe(MagickFormat.Gif);
            expect(image.width).toBe(70);
            expect(image.height).toBe(46);
            image.getPixels((p) => {
                expect(p.getPixel(0, 0).length).toBe(5);
            });
        });
    });
});
