/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#chop', () => {
    it('should remove part of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.chop(new MagickGeometry(75, 100, 150, 25));

            expect(image.width).toBe(490);
            expect(image.height).toBe(455);
            expect(image).toHavePixelWithColor(122, 99, '#fff');
            expect(image).toHavePixelWithColor(122, 100, '#f5ee36ff');
            expect(image).toHavePixelWithColor(280, 99, '#fff');
            expect(image).toHavePixelWithColor(280, 100, '#223e92ff');
        });
    });
});
