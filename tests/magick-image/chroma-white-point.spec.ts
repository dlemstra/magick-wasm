// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { PrimaryInfo } from '../../src/primary-info';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#chromaRedPrimary', () => {
    it('should return the chroma white point', () => {
        TestFiles.redPng.read(image => {
            const primaryInfo = image.chromaWhitePoint;

            expect(primaryInfo.x).toBeCloseTo(0.31);
            expect(primaryInfo.y).toBeCloseTo(0.33);
            expect(primaryInfo.z).toBeCloseTo(0.36);
        });
    });

    it('should return the changed value', () => {
        TestFiles.Builtin.wizard.read(image => {
            image.chromaWhitePoint = new PrimaryInfo(1.2, 2.3, 3.4);

            const primaryInfo = image.chromaWhitePoint;

            expect(primaryInfo.x).toBe(1.2);
            expect(primaryInfo.y).toBe(2.3);
            expect(primaryInfo.z).toBe(3.4);
        });
    });
});
