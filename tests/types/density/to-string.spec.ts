/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Density } from '@src/types/density';
import { DensityUnit } from '@src/enums/density-unit';

describe('Density#toString', () => {
    it('should use undefined density units by default', () => {
        const density = new Density(4, 2, DensityUnit.PixelsPerCentimeter);
        expect(density.toString()).toBe('4x2');
    });

    it('should  add cm when density unit matches', () => {
        const density = new Density(4, 2, DensityUnit.PixelsPerCentimeter);
        expect(density.toString(DensityUnit.PixelsPerCentimeter)).toBe('4x2cm');
    });

    it('should add inch when density unit matches', () => {
        const density = new Density(4, 2, DensityUnit.PixelsPerInch);
        expect(density.toString(DensityUnit.PixelsPerInch)).toBe('4x2inch');
    });

    it('should convert cm to inch', () => {
        const density = new Density(4, 2, DensityUnit.PixelsPerCentimeter);
        expect(density.toString(DensityUnit.PixelsPerInch)).toBe('10.16x5.08inch');
    });

    it('should convert inch to cm', () => {
        const density = new Density(4, 2, DensityUnit.PixelsPerInch);
        expect(density.toString(DensityUnit.PixelsPerCentimeter)).toBe('1.574803149606299x0.7874015748031495cm');
    });
});
