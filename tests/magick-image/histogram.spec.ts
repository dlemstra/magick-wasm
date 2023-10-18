// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('MagickImage#histogram', () => {
    it('should return a histogram of the image', () => {
        TestImages.Builtin.logo.use(image => {
            const histogram = image.histogram();

            expect(histogram).not.toBeNull();
            expect(histogram.size).toBe(256);
            expect(histogram.get(MagickColors.Red.toString())).toBe(2942);
            expect(histogram.get(MagickColors.White.toString())).toBe(256244);
        });
    });
});
