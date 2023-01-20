// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
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

describe('MagickImageCollection#flatten', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            images.flatten(() => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should flatten the images', () => {
        TestFiles.roseSparkleGif.readCollection(images => {
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
