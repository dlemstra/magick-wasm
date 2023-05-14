// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Density } from '../../src/density';
import { DensityUnit } from '../../src/density-unit';

describe('Density#constructor', () => {
    it('should set the properties', () => {
        const geometry = new Density(4, 2, DensityUnit.PixelsPerCentimeter);
        expect(geometry.x).toBe(4);
        expect(geometry.y).toBe(2);
        expect(geometry.units).toBe(DensityUnit.PixelsPerCentimeter);
    });

    it('should set x and y to the same value', () => {
        const geometry = new Density(42, DensityUnit.PixelsPerCentimeter);
        expect(geometry.x).toBe(42);
        expect(geometry.y).toBe(42);
        expect(geometry.units).toBe(DensityUnit.PixelsPerCentimeter);
    });

    it('should use PixelsPerInch as the default value', () => {
        const geometry = new Density(42);
        expect(geometry.x).toBe(42);
        expect(geometry.y).toBe(42);
        expect(geometry.units).toBe(DensityUnit.PixelsPerInch);
    });
});
