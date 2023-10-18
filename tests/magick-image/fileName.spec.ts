// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#fileName', () => {
    it('should return the name of the file', async () => {
        TestImages.Builtin.logo.use(image => {
            expect(image.fileName).toBe('LOGO');
        });
    });
});
