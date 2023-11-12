// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#quality', () => {
    it('should not allow a value below 1', () => {
        TestImages.empty.use(image => {
            image.quality = 0;
            expect(image.quality).toBe(1);
        });
    });

    it('should not allow a value above 100', () => {
        TestImages.empty.use(image => {
            image.quality = 101;
            expect(image.quality).toBe(100);
        });
    });

    it('should return the image quality', async () => {
        TestImages.imageMagickJpg.use(image => {
            expect(image.quality).toBe(100);
        });
    });
});
