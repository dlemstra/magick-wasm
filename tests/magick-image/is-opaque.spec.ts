// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#hasAlpha', () => {
    it('should return true when the image is fully opaque', async () => {
        TestImages.imageMagickJpg.use(image => {
            expect(image.isOpaque).toBe(true);
        });
    });

    it('should return false when the image contains a (semi) transparent pixel', async () => {
        TestImages.redPng.use(image => {
            expect(image.isOpaque).toBe(false);
        });
    });
});
