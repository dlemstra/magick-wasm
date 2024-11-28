/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#depth', () => {
    it('should be used when writing the image', () => {
        TestFiles.Images.Builtin.logo.use(input => {
            input.settings.depth = 5;

            input.write(MagickFormat.Tga, (data) => {
                ImageMagick.read(data, MagickFormat.Tga, output => {
                    expect(output.depth).toBe(5);
                });
            });
        });
    });
});
