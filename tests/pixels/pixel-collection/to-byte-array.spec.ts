// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('PixelCollection#toByteArray', () => {
    it('should return array with the correct size', () => {
        TestImages.Builtin.logo.use((image) => {
            image.getPixels(pixels => {
                const data = pixels.toByteArray(0, 0, 2, 3, 'rgb');
                expect(data).not.toBeNull();
                if (data !== null)
                    expect(data.length).toBe(18);
            });
        });
    });
});
