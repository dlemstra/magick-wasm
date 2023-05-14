// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '../test-images';

describe('MagickImage#hasAlpha', () => {
    it('should return true when image has alpha channel', async () => {
        TestImages.redPng.use(image => {
            expect(image.hasAlpha).toBe(true);
        });
    });

    it('should should disable the alpha channel', async () => {
        TestImages.redPng.use(image => {
            image.hasAlpha = false;

            expect(image.hasAlpha).toBe(false);
        });
    });
});
