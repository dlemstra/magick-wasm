/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#roll', () => {
    it('should roll the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.roll(100, 100);

            expect(image).toHavePixelWithColor(465, 0, '#040707');
            expect(image).toHavePixelWithColor(470, 0, '#223e92');
            expect(image).toHavePixelWithColor(465, 479, '#040707');
            expect(image).toHavePixelWithColor(470, 479, '#223e92');
        });
    });
});
