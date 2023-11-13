// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '@src/image-magick';
import { Interlace } from '@src/enums/interlace';
import { MagickFormat } from '@src/enums/magick-format';
import { TestImages } from '@test/test-images';

describe('MagickSettings#interlace', () => {
    it('should change the interlace of the image', () => {
        TestImages.redPng.use(input => {
            input.settings.interlace = Interlace.Gif;
            input.write(MagickFormat.Gif, (data) => {
                ImageMagick.read(data, output => {
                    expect(output.interlace).toBe(Interlace.Gif);
                });
            });
        });
    });
});
