/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Quantum } from '@src/quantum';

describe('Quantum#max', () => {
    it('should return the correct value', () => {
        expect(Quantum.max).toBe(255);
    });
});
