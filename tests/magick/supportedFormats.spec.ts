/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { Magick } from '../../src/magick';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('Magick#supportedFormats', () => {
    it('should return the supported formats', () => {
        const formats = Magick.supportedFormats;

        expect(formats).not.toBeNull();
        expect(formats.length).toBe(247);
    });
});