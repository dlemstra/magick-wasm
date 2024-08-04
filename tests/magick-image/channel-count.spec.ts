/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#channelCount', () => {
    it('should return the number of channels', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image.channelCount).toBe(4);
        })
    });
});
