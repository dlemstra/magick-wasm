// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#channelCount', () => {
    it('should create a clone of the image', () => {
        image.read(MagickColors.Magenta, 1, 1);
        image.clone(clone => {
            const difference = image.compare(clone, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });
});
