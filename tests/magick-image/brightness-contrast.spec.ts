// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#brightnessContrast', () => {
    it('should use the correct default values', () => {
        image.clone(other => {
            other.brightnessContrast(0);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should use both brightness and contrast', () => {
        image.clone(other => {
            other.brightnessContrast(0, 0);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });
});
