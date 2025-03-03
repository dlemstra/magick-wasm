/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#chopVertical', () => {
    it('should remove part of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.chopVertical(24, 42);

            expect(image.width).toBe(640);
            expect(image.height).toBe(438);

            expect(image).toHavePixelWithColor(301, 23, '#f5ee36');
            expect(image).toHavePixelWithColor(301, 24, '#f00');
            expect(image).toHavePixelWithColor(247, 23, '#fff');
            expect(image).toHavePixelWithColor(247, 24, '#f00');
        });
    });
});
