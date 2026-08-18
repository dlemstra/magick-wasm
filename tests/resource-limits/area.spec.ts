/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#area', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.area).toBe(17179607040n);
    });

    it('should change the value', () => {
        ResourceLimits.area = ResourceLimits.area - 1n;

        expect(ResourceLimits.area).toBe(17179607039n);
    });
});
