// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Interlace } from '../../src/interlace';
import { TestFiles } from '../test-files';

describe('MagickImage#interlace', () => {
    it('should return interlace of the image', async () => {
        await TestFiles.roseSparkleGif.read(image => {
            expect(image.interlace).toBe(Interlace.NoInterlace);
        });
    });
});
