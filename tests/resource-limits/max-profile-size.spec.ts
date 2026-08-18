/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#maxProfileSize', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.maxProfileSize).toBe(2147483647n);
    });

    it('should change the value', () => {
        ResourceLimits.maxProfileSize = ResourceLimits.maxProfileSize - 1n;

        expect(ResourceLimits.maxProfileSize).toBe(2147483646n);
    });
});
