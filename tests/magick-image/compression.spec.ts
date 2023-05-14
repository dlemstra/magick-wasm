// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { CompressionMethod } from '../../src/compression-method';
import { TestImages } from '../test-images';

describe('MagickImage#compression', () => {
    it('should return the compression method', async () => {
        TestImages.redPng.use(image => {
            expect(image.compression).toBe(CompressionMethod.Zip);
        });
    });
});
