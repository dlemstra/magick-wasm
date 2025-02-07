/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickOrientationType } from '@src/enums/magick-orientation-type';
import { TestFiles } from '@test/test-files';

describe('MagickImage#autoOrient', () => {
    it('should rotate the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.orientation = MagickOrientationType.LeftTop;
            image.autoOrient();

            expect(image.orientation).toBe(MagickOrientationType.TopLeft);
            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
        });
    });
});
