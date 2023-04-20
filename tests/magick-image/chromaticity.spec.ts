// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ChromaticityInfo } from '../../src/chromaticity-info';
import { ImageMagick } from '../../src/image-magick';
import { PrimaryInfo } from '../../src/primary-info';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#chromaBluePrimary', () => {
    it('should return the chromaticity', async () => {
        await TestFiles.redPng.read(image => {
            const chromaticity = image.chromaticity;

            expect(chromaticity.red.x).toBeCloseTo(0.64);
            expect(chromaticity.red.y).toBeCloseTo(0.33);
            expect(chromaticity.red.z).toBeCloseTo(0.03);
            expect(chromaticity.green.x).toBeCloseTo(0.30);
            expect(chromaticity.green.y).toBeCloseTo(0.60);
            expect(chromaticity.green.z).toBeCloseTo(0.1);
            expect(chromaticity.blue.x).toBeCloseTo(0.15);
            expect(chromaticity.blue.y).toBeCloseTo(0.06);
            expect(chromaticity.blue.z).toBeCloseTo(0.79);
            expect(chromaticity.white.x).toBeCloseTo(0.31);
            expect(chromaticity.white.y).toBeCloseTo(0.33);
            expect(chromaticity.white.z).toBeCloseTo(0.36);
        });
    });

    it('should return the changed value', async () => {
        await TestFiles.Builtin.wizard.read(image => {
            image.chromaticity = new ChromaticityInfo(
                new PrimaryInfo(1.2, 2.3, 3.4),
                new PrimaryInfo(4.5, 5.6, 6.7),
                new PrimaryInfo(7.6, 6.5, 5.4),
                new PrimaryInfo(4.3, 3.2, 2.1));

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
