// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '@src/magick-colors';
import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#deskew', () => {
    it('should rotate the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.deskew(new Percentage(4.2));

            expect(image).toHavePixelWithColor(158, 16, MagickColors.Black);
        });
    });

    it('should return the angle', () => {
        TestImages.Builtin.logo.use(image => {
            const angle = image.deskew(new Percentage(42));
            expect(angle).toEqual(0.8951737102110744);
            expect(image.width).toEqual(649);
            expect(image.height).toEqual(492);
        });
    });

    it('should use the autocrop parameter', () => {
        TestImages.Builtin.logo.use(image => {
            const angle = image.deskew(new Percentage(42), true);
            expect(angle).toEqual(0.8951737102110744);
            expect(image.width).toEqual(453);
            expect(image.height).toEqual(478);
        });
    });
});
