// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Interlace } from '@src/enums/interlace';
import { TestImages } from '@test/test-images';

describe('MagickImage#interlace', () => {
    it('should return interlace of the image', () => {
        TestImages.roseSparkleGif.use(images => {
            expect(images[0].interlace).toBe(Interlace.NoInterlace);
        });
    });
});
