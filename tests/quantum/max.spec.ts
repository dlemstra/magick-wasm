// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Quantum } from '../../src/quantum';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('Quantum#max', () => {
    it('should return the correct value', () => {
        expect(Quantum.max).toBe(255);
    });
});