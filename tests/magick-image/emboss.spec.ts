/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#emboss', () => {
    it('should use the default radius and sigma', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.emboss();
                other.emboss(0, 1);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should highlight edges with a 3D effect', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                image.emboss(2, 1);

                expect(image.width).toBe(original.width);
                expect(image.height).toBe(original.height);
                expect(image).toEqualImage(original, 0.13401);
            });
        });
    });
});
