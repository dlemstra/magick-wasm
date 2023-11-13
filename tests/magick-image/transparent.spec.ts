// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Gravity } from '@src/enums/gravity';
import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/magick-geometry';
import { TestImages } from '@test/test-images';

describe('MagickImage#transparent', () => {
    it('should change pixels with matching color to transparent', () => {
        TestImages.Color.red.use(image => {
            image.extent(new MagickGeometry('1x2'), Gravity.South, MagickColors.White)

            image.transparent(MagickColors.Red);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
            expect(image).toHavePixelWithColor(0, 1, new MagickColor('#ff000000'));
        });
    });
});
