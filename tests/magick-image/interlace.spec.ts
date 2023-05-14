// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Interlace } from '../../src/interlace';
import { TestImages } from '../test-images';

describe('MagickImage#interlace', () => {
    it('should return interlace of the image', async () => {
        await TestImages.roseSparkleGif.read(image => {
            expect(image.interlace).toBe(Interlace.NoInterlace);
        });
    });
});
