/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#magnify', () => {
    it('should double the size of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.magnify();

            expect(image.width).toBe(1280);
            expect(image.height).toBe(960);
        });
    });
});
