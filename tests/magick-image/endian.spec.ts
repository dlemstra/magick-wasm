/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Endian } from '@src/enums/endian';
import { ImageMagick } from '@src/image-magick';
import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickImage#endian', () => {
    it('should return the endianess of the image', () => {
        TestFiles.Images.Builtin.logo.use(input => {
            input.write(MagickFormat.Farbfeld, (data) => {
                ImageMagick.read(data, output => {
                    expect(output.endian).toBe(Endian.MSB);
                });
            });
        });
    });

    it('should change the endianess of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.endian = Endian.LSB;
            expect(image.endian).toBe(Endian.LSB);
        });
    });
});
