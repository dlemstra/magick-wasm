// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#baseWidth', () => {
    it('should return the width of the image before transformations.', () => {
        TestImages.Builtin.logo.use(image => {
            image.resize(1, 1);

            expect(image.baseWidth).toBe(640);
        })
    });
});
