/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#gamma', () => {
    it('should return the gamma of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.gamma).toBeCloseTo(0.45454, 4);
        });
    });
});
