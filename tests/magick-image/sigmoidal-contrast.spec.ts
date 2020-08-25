/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#sigmoidalContrast', () => {
    it('should sharpen by default', () => {
        image.clone(other => {
            image.sigmoidalContrast(0.8);
            other.sigmoidalContrast(true, 0.8);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should use half of quantum for midpoint by default', () => {
        image.clone(other => {
            image.sigmoidalContrast(true, 4.0);
            other.sigmoidalContrast(true, 4.0, new Percentage(50));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should adjust the image contrast', () => {
        image.clone(other => {
            other.sigmoidalContrast(true, 4.0, new Percentage(25));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.04179);
        });
    });
});