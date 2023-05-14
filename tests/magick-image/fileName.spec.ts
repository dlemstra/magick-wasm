// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestFiles } from '../test-files';

describe('MagickImage#fileName', () => {
    it('should return the name of the file', async () => {
        await TestFiles.Builtin.logo.read(image => {
            expect(image.fileName).toBe('LOGO');
        });
    });
});
