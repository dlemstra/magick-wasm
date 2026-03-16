/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('Coders#heic', () => {
    it('should be able to write avif image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.write(MagickFormat.Avif, data => {
                expect(data.length).toBe(11333);
                ImageMagick.read(data, image => {
                    expect(image.format).toBe(MagickFormat.Avif);
                });
            });
        });
    });
});
