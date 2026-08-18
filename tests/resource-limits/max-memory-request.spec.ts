/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#maxMemoryRequest', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.maxMemoryRequest).toBe(2147483647n);
    });

    it('should change the value', () => {
        ResourceLimits.maxMemoryRequest = ResourceLimits.maxMemoryRequest - 1n;

        expect(ResourceLimits.maxMemoryRequest).toBe(2147483646n);
    });
});
