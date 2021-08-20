// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';
import { colorAssert } from '../color-assert';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#modulate', () => {
    it('should default to 100 percent for saturation and hue', () => {
        image.clone(other => {
            image.modulate(new Percentage(50));
            other.modulate(new Percentage(50), new Percentage(100), new Percentage(100));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should default to 100 percent for hue', () => {
        image.clone(other => {
            image.modulate(new Percentage(50), new Percentage(25));
            other.modulate(new Percentage(50), new Percentage(25), new Percentage(100));

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should modulate the image', () => {
        image.modulate(new Percentage(75), new Percentage(50), new Percentage(25));

        colorAssert(image, 340, 270, '#43582eff');
        colorAssert(image, 410, 155, '#863da3ff');
        colorAssert(image, 430, 230, '#4f47a9ff');
        colorAssert(image, 500, 313, '#bfbfbfff');
    });
});
