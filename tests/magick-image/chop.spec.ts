/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#chop', () => {
    it('should remove part of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.chop(new MagickGeometry(100, 100, 100, 100));

            expect(image).toHavePixelWithColor(300, 99, '#fff');
            expect(image).toHavePixelWithColor(300, 100, '#f79868ff');
            expect(image).toHavePixelWithColor(406, 99, '#333636ff');
            expect(image).toHavePixelWithColor(406, 100, '#fff');
        });
    });
});
