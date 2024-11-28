/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Interlace } from '@src/enums/interlace';
import { TestFiles } from '@test/test-files';

describe('MagickImage#interlace', () => {
    it('should return interlace of the image', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            expect(images[0].interlace).toBe(Interlace.NoInterlace);
        });
    });
});
