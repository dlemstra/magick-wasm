// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('MagickImage#rotate', () => {
    it('should rotate the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.rotate(90);

            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
        });
    });

    it('should change the dimensions of the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.backgroundColor = MagickColors.Pink;
            image.rotate(45);

            expect(image.width).toBe(794);
            expect(image.height).toBe(794);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Pink)
        });
    });
});
