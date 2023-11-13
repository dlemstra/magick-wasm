// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Density } from '@src/types/density';
import { DensityUnit } from '@src/enums/density-unit';
import { TestImages } from '@test/test-images';

describe('Magick#density', () => {
    it('should return the density of the image', () => {
        TestImages.redPng.use((image) => {
            const density = image.density;

            expect(density.x).toBe(27.95);
            expect(density.y).toBe(27.95);
            expect(density.units).toBe(DensityUnit.PixelsPerCentimeter);
        });
    });

    it('should change the density of the image', () => {
        TestImages.redPng.use((image) => {
            image.density = new Density(42, 24, DensityUnit.PixelsPerInch);
            const density = image.density;

            expect(density.x).toBe(42);
            expect(density.y).toBe(24);
            expect(density.units).toBe(DensityUnit.PixelsPerInch);
        });
    });
});
