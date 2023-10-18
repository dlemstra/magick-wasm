// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Magick } from '@src/magick';

describe('Magick#features', () => {
    it('should return the correct features', () => {
        expect(Magick.features).toBe('Cipher');
    });
});
