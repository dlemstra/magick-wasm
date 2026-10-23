/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#tint', () => {
    it('should apply a color vector to the pixels while preserving black and white', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.tint(new MagickGeometry('1x2'), MagickColors.Gold);

            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
            expect(image).toHavePixelWithColor(400, 205, '#de0000');
            expect(image).toHavePixelWithColor(400, 380, MagickColors.Black);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
        });
    });

    it('should use the specified tint color', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.tint(new MagickGeometry('50x50'), MagickColors.Red);
                other.tint(new MagickGeometry('50x50'), MagickColors.Blue);

                expect(image).toEqualImage(other, 0.12416);
            });
        });
    });

    it('should use the specified opacity', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.tint(new MagickGeometry('25x25'), MagickColors.Gold);
                other.tint(new MagickGeometry('75x75'), MagickColors.Gold);

                expect(image).toEqualImage(other, 0.06119);
            });
        });
    });
});
