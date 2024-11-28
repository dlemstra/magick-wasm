/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('PixelCollection#getPixel', () => {
    it('should return array with the correct size', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.getPixels(pixels => {
                const data = pixels.getPixel(0, 0);
                expect(data).not.toBeNull();
                expect(data.length).toBe(4);
            });
        });
    });
});
