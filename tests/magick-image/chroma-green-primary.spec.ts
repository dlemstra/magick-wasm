// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { PrimaryInfo } from '../../src/primary-info';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#chromaGreenPrimary', () => {
    it('should return the chroma blue primary', () => {
        TestFiles.redPng.read(image => {
            const primaryInfo = image.chromaGreenPrimary;

            expect(primaryInfo.x).toBeCloseTo(0.30);
            expect(primaryInfo.y).toBeCloseTo(0.60);
            expect(primaryInfo.z).toBeCloseTo(0.1);
        });
    });

    it('should return the changed value', () => {
        TestFiles.Builtin.wizard.read(image => {
            image.chromaGreenPrimary = new PrimaryInfo(1.2, 2.3, 3.4);

            const primaryInfo = image.chromaGreenPrimary;

            expect(primaryInfo.x).toBe(1.2);
            expect(primaryInfo.y).toBe(2.3);
            expect(primaryInfo.z).toBe(3.4);
        });
    });
});
