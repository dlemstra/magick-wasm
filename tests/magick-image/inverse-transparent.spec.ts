/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Gravity } from '@src/enums/gravity';
import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#inverseTransparent', () => {
    it('should change pixels not matching color to transparent', () => {
        TestFiles.Images.Color.red.use((image) => {
            image.extent(new MagickGeometry('1x2'), Gravity.South, MagickColors.White)

            image.inverseTransparent(MagickColors.Red);

            expect(image).toHavePixelWithColor(0, 0, new MagickColor('#ffffff00'));
            expect(image).toHavePixelWithColor(0, 1, MagickColors.Red);
        });
    });
});
