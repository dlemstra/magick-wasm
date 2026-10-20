/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { VirtualPixelMethod } from '@src/enums/virtual-pixel-method';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#shear', () => {
    it('should shear the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.backgroundColor = MagickColors.Firebrick;
            image.virtualPixelMethod = VirtualPixelMethod.Background;
            image.shear(20, 40);

            expect(image.width).toBeGreaterThan(640);
            expect(image.height).toBeGreaterThan(480);
            expect(image).toHavePixelWithColor(10, 10, MagickColors.Firebrick);
        });
    });
});
