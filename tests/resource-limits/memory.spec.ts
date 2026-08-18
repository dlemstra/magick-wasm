/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#memory', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.memory).toBe(4294901760n);
    });

    it('should change the value', () => {
        ResourceLimits.memory = ResourceLimits.memory - 1n;

        expect(ResourceLimits.memory).toBe(4294901759n);
    });
});
