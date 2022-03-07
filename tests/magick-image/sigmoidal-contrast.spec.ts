// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';
import { Quantum } from '../../src/quantum';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#sigmoidalContrast', () => {
    it('should use half of quantum for midpoint by default', () => {
        image.clone(other => {
            image.sigmoidalContrast(4.0);
            other.sigmoidalContrast(4.0, new Percentage(50));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should adjust the image contrast', () => {
        image.clone(other => {
            other.sigmoidalContrast(4.0, new Percentage(25));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.04179);
        });
    });

    it('should adjust the specified channel', () => {
        image.clone(other => {
            other.sigmoidalContrast(4.0, Quantum.max * 0.25, Channels.Blue);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.03082);
        });
    });
});
