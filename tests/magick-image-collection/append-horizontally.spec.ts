// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickImageCollection } from '../../src/magick-image-collection';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImageCollection#appendHorizontally', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            const images = MagickImageCollection.create();
            images.appendHorizontally(() => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should create a new image with the images appended horizontally', async () => {
        await TestFiles.roseSparkleGif.readCollection(images => {
            images.appendHorizontally(image => {
                expect(image.width).toBe(210);
                expect(image.height).toBe(46);
            });
        });
    });
});
