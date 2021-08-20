// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { TestFiles, readTestFile } from '../test-files';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#hasAlpha', () => {
    it('should return true when image has alpha channel', async () => {
        await readTestFile(TestFiles.redPng, image => {
            expect(image.hasAlpha).toBe(true);
        });
    });

    it('should should disable the alpha channel', async () => {
        await readTestFile(TestFiles.redPng, image => {
            image.hasAlpha = false;

            expect(image.hasAlpha).toBe(false);
        });
    });
});
