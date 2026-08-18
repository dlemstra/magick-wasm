/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#disk', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.disk).toBe(9223372036854775807n);
    });

    it('should change the value', () => {
        ResourceLimits.disk = ResourceLimits.disk - 1n;

        expect(ResourceLimits.disk).toBe(9223372036854775806n);
    });
});
