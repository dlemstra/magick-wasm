/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#splice', () => {
    it('should splice the background color into the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.backgroundColor = MagickColors.MediumPurple;
            image.splice(new MagickGeometry(20, 30, 40, 50));
            expect(image).toHavePixelWithColor(19, 29, '#ffffff');
            expect(image).toHavePixelWithColor(20, 30, '#9370db');
            expect(image).toHavePixelWithColor(59, 79, '#9370db');
            expect(image).toHavePixelWithColor(60, 80, '#ffffff');
        });
    });
});
