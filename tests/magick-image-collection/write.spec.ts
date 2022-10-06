// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImageCollection, MagickImageCollection } from '../../src/magick-image-collection';
import { TestFiles } from '../test-files';

let images: IMagickImageCollection;

beforeEach(() => {
    ImageMagick._api = global.native;
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
        const data = TestFiles.roseSparkleGif.toBufferSync();
        images.read(data);

        images.write(newData => {
            images.dispose();
            images.read(newData);

            expect(images.length).toBe(3);
        });
    });
});
