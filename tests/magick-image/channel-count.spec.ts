/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#channelCount', () => {
    it('should return the number of channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.channelCount).toBe(4);
        })
    });
});
