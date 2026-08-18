/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#width', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.width).toBe(33554431n);
    });

    it('should change the value', () => {
        ResourceLimits.width = ResourceLimits.width - 1n;

        expect(ResourceLimits.width).toBe(33554430n);
    });
});
