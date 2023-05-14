// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestFiles } from '../test-files';

describe('MagickImage#baseWidth', () => {
    it('should return the width of the image before transformations.', async () => {
        await TestFiles.Builtin.logo.read(image => {
            image.resize(1, 1);

            expect(image.baseWidth).toBe(640);
        })
    });
});
