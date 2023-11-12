// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#threshold', () => {
    it('should tbe zero for an empty image', () => {
        TestImages.empty.use((image) => {
            expect(image.totalColors).toBe(0);
        });
    });

    it('should return the total number of colors in an image', () => {
        TestImages.cmykJpg.use((image) => {
            expect(image.totalColors).toBe(9355);
        });
    });
});
