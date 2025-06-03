/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#totalColors', () => {
    it('should tbe zero for an empty image', () => {
        TestFiles.Images.empty.use((image) => {
            expect(image.totalColors).toBe(0);
        });
    });

    it('should return the total number of colors in an image', () => {
        TestFiles.Images.cmykJpg.use((image) => {
            expect(image.totalColors).toBe(9355);
        });
    });
});
