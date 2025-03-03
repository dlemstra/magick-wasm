/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#chopHorizontal', () => {
    it('should remove part of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.chopHorizontal(100, 50);

            expect(image.width).toBe(590);
            expect(image.height).toBe(480);

            expect(image).toHavePixelWithColor(99, 94, '#fff');
            expect(image).toHavePixelWithColor(100, 94, '#f00');
            expect(image).toHavePixelWithColor(99, 130, '#f5ee36');
            expect(image).toHavePixelWithColor(100, 130, '#f00');
        });
    });
});
