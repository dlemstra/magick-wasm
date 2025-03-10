/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { CompressionMethod } from '@src/enums/compression-method';
import { ImageMagick } from '@src/image-magick';
import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#compression', () => {
    it('should be used when saving image', () => {
        TestFiles.Images.imageMagickJpg.use(input => {
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
