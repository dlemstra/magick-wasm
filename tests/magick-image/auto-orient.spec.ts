/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Orientation } from '@src/enums/orientation';
import { TestFiles } from '@test/test-files';

describe('MagickImage#autoOrient', () => {
    it('should rotate the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.orientation = Orientation.LeftTop;
            image.autoOrient();

            expect(image.orientation).toBe(Orientation.TopLeft);
            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
        });
    });
});
