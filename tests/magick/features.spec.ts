// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Magick } from '../../src/magick';

beforeAll(() => { ImageMagick._api = global.native; });

describe('Magick#features', () => {
    it('should return the correct features', () => {
        expect(Magick.features).toBe('Cipher');
    });
});
