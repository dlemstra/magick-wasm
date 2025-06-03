/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#isOpaque', () => {
    it('should return true when the image is fully opaque', async () => {
        TestFiles.Images.imageMagickJpg.use(image => {
            expect(image.isOpaque).toBe(true);
        });
    });

    it('should return false when the image contains a (semi) transparent pixel', async () => {
        TestFiles.Images.redPng.use(image => {
            expect(image.isOpaque).toBe(false);
        });
    });
});
