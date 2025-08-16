/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';
import { TestFiles } from '@test/test-files';

describe('MagickImage#affineTransform', () => {
    it('should change the size of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.affineTransform(new DrawableAffine(0.4, 0.5, 0.6, 0.7, 0.8, 0.9));

            expect(image.width).toBe(594);
            expect(image.height).toBe(626);
        });
    });
});
