/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { CompressionMethod } from '@src/enums/compression-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#compression', () => {
    it('should return the compression method', async () => {
        TestFiles.Images.redPng.use(image => {
            expect(image.compression).toBe(CompressionMethod.Zip);
        });
    });
});
