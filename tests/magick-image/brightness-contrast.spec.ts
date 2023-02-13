// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#brightnessContrast', () => {
    it('should not change at all', () => {
        image.clone(other => {
            other.brightnessContrast(new Percentage(0), new Percentage(0));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should change the brightness only', () => {
        image.clone(other => {
            other.brightnessContrast(new Percentage(50), new Percentage(0));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.18056);
        });
    });

    it('should change both brightness and contrast', () => {
        image.clone(other => {
            other.brightnessContrast(new Percentage(50), new Percentage(100));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.126);
        });
    });
});
