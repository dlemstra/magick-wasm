// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { CompressionMethod } from '../../../src/compression-method';
import { ImageMagick } from '../../../src/image-magick';
import { MagickFormat } from '../../../src/magick-format';
import { TestImages } from '../../test-images';

describe('MagickSettings#compression', () => {
    it('should be used when saving image', () => {
        TestImages.imageMagickJpg.use(input => {
            input.settings.compression = CompressionMethod.Zip;
            input.write(MagickFormat.Tiff, (data) => {
                ImageMagick.read(data, (output) => {
                    expect(output.format).toBe(MagickFormat.Tiff);
                    expect(output.compression).toBe(CompressionMethod.Zip);
                });
            });
        });
    });
});
