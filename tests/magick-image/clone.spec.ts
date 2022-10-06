// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
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
