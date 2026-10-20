/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#transverse', () => {
    it('should create a vertical mirror image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.transverse();

            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
            expect(image).toHavePixelWithColor(418, 347, MagickColors.Red);
            expect(image).toHavePixelWithColor(375, 262, '#f5ee36');
            expect(image).toHavePixelWithColor(37, 248, '#ed1f24');
        });
    });

    it('should restore the original image when applied twice', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                image.transverse();
                image.transverse();

                expect(image).toEqualImage(original);
            });
        });
    });
});
