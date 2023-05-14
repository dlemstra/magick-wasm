// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { CompressionMethod } from '../../src/compression-method';
import { TestFiles } from '../test-files';

describe('MagickImage#compression', () => {
    it('should return the compression method', async () => {
        await TestFiles.redPng.read(image => {
            expect(image.compression).toBe(CompressionMethod.Zip);
        });
    });
});
