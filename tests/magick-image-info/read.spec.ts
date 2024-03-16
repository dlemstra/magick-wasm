// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ColorSpace } from '@src/enums/color-space';
import { CompressionMethod } from '@src/enums/compression-method';
import { DensityUnit } from '@src/enums/density-unit';
import { Interlace } from '@src/enums/interlace';
import { MagickFormat } from '@src/enums/magick-format';
import { MagickImageInfo } from '@src/magick-image-info';
import { TestImages } from '@test/test-images';

describe('MagickImageInfo#constructor', () => {
    it('should read the information of the image', () => {
        const magickImageInfo = new MagickImageInfo();
        magickImageInfo.read(TestImages.fujiFilmFinePixS1ProJpg.data);
        expect(magickImageInfo.colorSpace).toBe(ColorSpace.sRGB);
        expect(magickImageInfo.compression).toBe(CompressionMethod.JPEG);
        expect(magickImageInfo.density.x).toBe(300);
        expect(magickImageInfo.density.y).toBe(300);
        expect(magickImageInfo.density.units).toBe(DensityUnit.PixelsPerInch);
        expect(magickImageInfo.format).toBe(MagickFormat.Jpeg);
        expect(magickImageInfo.height).toBe(400);
        expect(magickImageInfo.interlace).toBe(Interlace.NoInterlace);
        expect(magickImageInfo.quality).toBe(70);
        expect(magickImageInfo.width).toBe(600);
    });
});
