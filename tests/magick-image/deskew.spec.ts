// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '../../src/magick-colors';
import { Percentage } from '../../src/percentage';
import { TestImages } from '../test-images';

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
        });
    });
});
