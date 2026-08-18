/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#time', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.time).toBe(9223372036854775807n);
    });

    it('should change the value', () => {
        ResourceLimits.time = ResourceLimits.time - 1n;

        expect(ResourceLimits.time).toBe(9223372036854775806n);
    });
});
