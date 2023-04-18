// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ColorType } from '../../src/color-type';
import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#colorType', () => {
    it('should return the color type', () => {
        TestFiles.Builtin.logo.read(image => {
            expect(image.colorType).toBe(ColorType.Palette);
        });
    });

    it('should change color type', () => {
        TestFiles.Builtin.logo.read(image => {
            image.colorType = ColorType.TrueColor;
            expect(image.colorType).toBe(ColorType.TrueColor);
        });
    });
});
