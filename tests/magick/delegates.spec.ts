// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Magick } from '../../src/magick';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('Magick#delegates', () => {
    it('should return the delegates', () => {
        expect(Magick.delegates).toBe('freetype heic jng jp2 jpeg lcms png raw tiff webp xml zlib');
    });
});