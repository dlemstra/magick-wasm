// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ColorSpace } from '../../src/color-space';
import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#colorSpace', () => {
    it('should return the color space', async () => {
        await TestFiles.Builtin.logo.read(image => {
            expect(image.colorSpace).toBe(ColorSpace.sRGB);
        });
    });

    it('should change the color space', async () => {
        await TestFiles.Builtin.logo.read(image => {
            image.colorSpace = ColorSpace.CMYK;
            expect(image.colorSpace).toBe(ColorSpace.CMYK);
        });
    });
});
