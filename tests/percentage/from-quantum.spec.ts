// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Percentage } from '@src/types/percentage';

describe('MagickGeometry#fromQuantum', () => {
    it('should return the percentage of the Quantum max as a normal percentage.', () => {
        const percentage = Percentage.fromQuantum(25.5);
        expect(percentage.toDouble()).toBe(10);
    });
});
