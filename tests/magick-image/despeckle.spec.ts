/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#despeckle', () => {
    it('should reduce speckle noise in the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                image.despeckle();

                expect(image.width).toBe(original.width);
                expect(image.height).toBe(original.height);
                expect(image).toEqualImage(original, 0.00513);
            });
        });
    });
});
