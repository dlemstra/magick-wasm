/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickAlphaOption } from '@src/enums/magick-alpha-option';
import { TestFiles } from '@test/test-files';

describe('MagickImage#alpha', () => {
    it('should enable alpha channel', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.alpha(MagickAlphaOption.On);
            expect(image.channelCount).toBe(5);
            expect(image.hasAlpha).toBe(true);
        });
    });
});
