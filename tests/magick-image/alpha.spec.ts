/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { AlphaAction } from '@src/enums/alpha-action';
import { TestFiles } from '@test/test-files';

describe('MagickImage#alpha', () => {
    it('should enable alpha channel', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.alpha(AlphaAction.On);
            expect(image.channelCount).toBe(5);
            expect(image.hasAlpha).toBe(true);
        });
    });
});
