/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#hasAlpha', () => {
    it('should return true when image has alpha channel', () => {
        TestFiles.Images.redPng.use(image => {
            expect(image.hasAlpha).toBe(true);
        });
    });

    it('should should disable the alpha channel', () => {
        TestFiles.Images.redPng.use(image => {
            image.hasAlpha = false;

            expect(image.hasAlpha).toBe(false);
        });
    });
});
