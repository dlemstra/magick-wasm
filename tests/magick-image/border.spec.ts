// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '../../src/magick-colors';
import { TestImages } from '../test-images';

describe('MagickImage#border', () => {
    it('should surround the image on all sides equally', () => {
        TestImages.Color.red.use(image => {
            image.border(2);

            expect(image.width).toBe(5);
            expect(image.height).toBe(5);
        });
    });

    it('should surround the image with different widths for each axis', () => {
        TestImages.Color.red.use(image => {
            image.border(2, 3);

            expect(image.width).toBe(5);
            expect(image.height).toBe(7);
        });
    });

    it('should use the border color of the image', () => {
        TestImages.Color.red.use(image => {
            image.borderColor = MagickColors.Purple;
            image.border(1, 1);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.Purple);
        });
    });
});
