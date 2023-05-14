// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '../test-images';

describe('MagickImage#fileName', () => {
    it('should return the name of the file', async () => {
        await TestImages.Builtin.logo.read(image => {
            expect(image.fileName).toBe('LOGO');
        });
    });
});
