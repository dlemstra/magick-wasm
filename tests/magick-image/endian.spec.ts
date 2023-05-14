// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Endian } from '../../src/endian';
import { ImageMagick } from '../../src/image-magick';
import { MagickFormat } from '../../src/magick-format';
import { TestImages } from '../test-images';

describe('MagickImage#endian', () => {
    it('should return the endianess of the image', async () => {
        await TestImages.Builtin.logo.read(input => {
            input.write(MagickFormat.Farbfeld, (data) => {
                ImageMagick.read(data, output => {
                    expect(output.endian).toBe(Endian.MSB);
                });
            });
        });
    });

    it('should change the endianess of the image', async () => {
        await TestImages.Builtin.logo.read(image => {
            image.endian = Endian.LSB;
            expect(image.endian).toBe(Endian.LSB);
        });
    });
});
