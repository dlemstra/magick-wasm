/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { AlphaOption } from '@src/enums/alpha-option';
import { TestFiles } from '@test/test-files';

describe('MagickImage#alpha', () => {
    it('should enable alpha channel', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.alpha(AlphaOption.On);
            expect(image.channelCount).toBe(5);
            expect(image.hasAlpha).toBe(true);
        });
    });
});
