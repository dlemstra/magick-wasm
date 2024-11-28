/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#baseHeight', () => {
    it('should return the height of the image before transformations.', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(1, 1);

            expect(image.baseHeight).toBe(480);
        })
    });
});
