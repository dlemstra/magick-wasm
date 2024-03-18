// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ColorSpace } from '@src/enums/color-space';
import { CompressionMethod } from '@src/enums/compression-method';
import { DensityUnit } from '@src/enums/density-unit';
import { Interlace } from '@src/enums/interlace';
import { MagickFormat } from '@src/enums/magick-format';
import { MagickImageInfo } from '@src/magick-image-info';
import { OrientationType } from '@src/enums/orientation-type';

describe('MagickImageInfo#constructor', () => {
    it('should create empty uninitialized instance', () => {
        const magickImageInfo = new MagickImageInfo();
        expect(magickImageInfo.colorSpace).toBe(ColorSpace.Undefined);
        expect(magickImageInfo.compression).toBe(CompressionMethod.Undefined);
        expect(magickImageInfo.density.x).toBe(0);
        expect(magickImageInfo.density.y).toBe(0);
        expect(magickImageInfo.density.units).toBe(DensityUnit.Undefined);
        expect(magickImageInfo.format).toBe(MagickFormat.Unknown);
        expect(magickImageInfo.height).toBe(0);
        expect(magickImageInfo.interlace).toBe(Interlace.Undefined);
        expect(magickImageInfo.orientation).toBe(OrientationType.Undefined);
        expect(magickImageInfo.quality).toBe(0);
        expect(magickImageInfo.width).toBe(0);
    });
});
