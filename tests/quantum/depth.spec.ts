/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Quantum } from '@src/quantum';

describe('Quantum#depth', () => {
    it('should return the correct value', () => {
        expect(Quantum.depth).toBe(8);
    });
});
