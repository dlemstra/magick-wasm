/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';

describe('MagickGeometry#_toQuantum', () => {
    it('should return the value as a percentage of the Quantum max.', () => {
        const percentage = new Percentage(10);

        expect(percentage._toQuantum()).toBe(25.5);
    });
});
