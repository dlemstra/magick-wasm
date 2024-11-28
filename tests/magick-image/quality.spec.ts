/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#quality', () => {
    it('should not allow a value below 1', () => {
        TestFiles.Images.empty.use(image => {
            image.quality = 0;
            expect(image.quality).toBe(1);
        });
    });

    it('should not allow a value above 100', () => {
        TestFiles.Images.empty.use(image => {
            image.quality = 101;
            expect(image.quality).toBe(100);
        });
    });

    it('should return the image quality', async () => {
        TestFiles.Images.imageMagickJpg.use(image => {
            expect(image.quality).toBe(100);
        });
    });
});
