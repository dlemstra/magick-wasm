/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { Quantum } from '../../src/quantum';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('Quantum#depth', () => {
    it('should return the correct value', () => {
        expect(Quantum.depth).toEqual(8);
    });
});