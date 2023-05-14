// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { PixelInterpolateMethod } from '../../src/pixel-interpolate-method';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#wave', () => {
    it('should use the correct default values', () => {
        image.clone(other => {
            image.interpolate = PixelInterpolateMethod.Blend;
            image.wave();

            other.wave(PixelInterpolateMethod.Blend, 25.0, 150.0);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBe(0);
        });
    });

    it('should wave the image', () => {
        image.clone(other => {
            other.wave(PixelInterpolateMethod.Mesh, 140, 40);

            const difference = other.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.627);
        });
    });
});
