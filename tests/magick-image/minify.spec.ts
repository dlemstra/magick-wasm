/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#minify', () => {
    it('should reduce the size of the image by half', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.minify();

            expect(image.width).toBe(320);
            expect(image.height).toBe(240);
        });
    });
});
