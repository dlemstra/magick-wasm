/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColorMatrix } from '@src/types/magick-color-matrix';
import { MagickColor } from '@src/magick-color';
import { TestFiles } from '@test/test-files';

describe('MagickImage#colorMatrix', () => {
    it('should apply the matrix to the image channels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(new MagickColor('#123456'), 9, 9);
            const matrix = new MagickColorMatrix(3, [
                0, 0, 1,
                0, 1, 0,
                1, 0, 0,
            ]);

            image.colorMatrix(matrix);

            expect(image.width).toBe(9);
            expect(image.height).toBe(9);
            expect(image).toHavePixelWithColor(4, 4, '#563412');
        });
    });

    it('should preserve the image when applying an identity matrix', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(32, 24);
            image.clone(original => {
                image.colorMatrix(new MagickColorMatrix(3, [
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1,
                ]));

                expect(image).toEqualImage(original);
            });
        });
    });
});
