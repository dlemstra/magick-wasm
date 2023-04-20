// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { CompressionMethod } from '../../src/compression-method';
import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#compression', () => {
    it('should return the compression method', async () => {
        await TestFiles.redPng.read(image => {
            expect(image.compression).toBe(CompressionMethod.Zip);
        });
    });
});
