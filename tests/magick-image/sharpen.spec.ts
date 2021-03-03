// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#sharpen', () => {
    it('should use correct defaults for radius and sigma.', () => {
        image.clone(other => {
            image.sharpen();
            other.sharpen(0, 1.0);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should use composite as default channels', () => {
        image.clone(other => {
            image.sharpen(1.0, 1.0);
            other.sharpen(1.0, 1.0, Channels.Composite);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should sharpen the image', () => {
        image.clone(original => {
            image.sharpen(10, 20);

            const difference = original.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.0395);
        });
    });
});