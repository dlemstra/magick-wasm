// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AlphaOption } from '@src/alpha-option';
import { TestImages } from '@test/test-images';

describe('MagickImage#alpha', () => {
    it('should enable alpha channel', () => {
        TestImages.Builtin.logo.use(image => {
            image.alpha(AlphaOption.On);
            expect(image.channelCount).toBe(5);
            expect(image.hasAlpha).toBe(true);
        });
    });
});
