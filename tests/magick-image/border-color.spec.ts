/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#borderColor', () => {
    it('should return the border color of the image', () => {
        TestFiles.Images.empty.use(image => {
            const borderColor = image.borderColor;

            expect(borderColor.r).toBe(223);
            expect(borderColor.g).toBe(223);
            expect(borderColor.b).toBe(223);
            expect(borderColor.a).toBe(255);
        });
    });

    it('should change border color', () => {
        TestFiles.Images.empty.use(image => {
            image.borderColor = MagickColors.Black;
            const borderColor = image.borderColor;

            expect(borderColor.r).toBe(0);
            expect(borderColor.g).toBe(0);
            expect(borderColor.b).toBe(0);
            expect(borderColor.a).toBe(255);
        });
    });
});
