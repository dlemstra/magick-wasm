// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#vignette', () => {
    it('should use the correct default values', () => {
        image.clone(other => {
            image.vignette();
            other.vignette(0.0, 1.0, 0, 0);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should soften the edges of the image', () => {
        image.clone(other => {
            other.vignette(1.4, 2.5, 0, 0);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.379);
        });
    });
});
