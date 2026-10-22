/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IChromaticityInfo } from '@src/types/chromaticity-info';
import { TestFiles } from '@test/test-files';

describe('MagickImage#chromaticity', () => {
    it('should return the chromaticity', () => {
        TestFiles.Images.redPng.use(image => {
            const chromaticity = image.chromaticity;

            expect(chromaticity.red.x).toBeCloseTo(0.64000, 4);
            expect(chromaticity.red.y).toBeCloseTo(0.33000, 4);
            expect(chromaticity.red.z).toBeCloseTo(0.030000, 4);
            expect(chromaticity.green.x).toBeCloseTo(0.30000, 4);
            expect(chromaticity.green.y).toBeCloseTo(0.60000, 4);
            expect(chromaticity.green.z).toBeCloseTo(0.10000, 4);
            expect(chromaticity.blue.x).toBeCloseTo(0.15000, 4);
            expect(chromaticity.blue.y).toBeCloseTo(0.06000, 4);
            expect(chromaticity.blue.z).toBeCloseTo(0.79000, 4);
            expect(chromaticity.white.x).toBeCloseTo(0.31270, 4);
            expect(chromaticity.white.y).toBeCloseTo(0.32900, 4);
            expect(chromaticity.white.z).toBeCloseTo(0.35830, 4);
        });
    });

    it('should return the changed value', () => {
        TestFiles.Images.Builtin.wizard.use(image => {
            const value: IChromaticityInfo = {
                red: { x: 1.2, y: 2.3, z: 3.4 },
                green: { x: 4.5, y: 5.6, z: 6.7 },
                blue: { x: 7.6, y: 6.5, z: 5.4 },
                white: { x: 4.3, y: 3.2, z: 2.1 },
            };
            image.chromaticity = value;

            const chromaticity = image.chromaticity;

            expect(chromaticity.red.x).toBe(1.2);
            expect(chromaticity.red.y).toBe(2.3);
            expect(chromaticity.red.z).toBe(3.4);
            expect(chromaticity.green.x).toBe(4.5);
            expect(chromaticity.green.y).toBe(5.6);
            expect(chromaticity.green.z).toBe(6.7);
            expect(chromaticity.blue.x).toBe(7.6);
            expect(chromaticity.blue.y).toBe(6.5);
            expect(chromaticity.blue.z).toBe(5.4);
            expect(chromaticity.white.x).toBe(4.3);
            expect(chromaticity.white.y).toBe(3.2);
            expect(chromaticity.white.z).toBe(2.1);
        });
    });
});
