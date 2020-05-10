/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { Magick } from '../../src/magick';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('Magick#delegates', () => {
    it('should return the delegates', () => {
        expect(Magick.delegates).toEqual('freetype heic jng jp2 jpeg lcms png raw tiff webp xml zlib');
    });
});