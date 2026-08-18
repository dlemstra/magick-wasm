/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ResourceLimits } from '@src/resource-limits';

describe('ResourceLimits#height', () => {
    it('should return the correct value', () => {
        expect(ResourceLimits.height).toBe(33554431n);
    });

    it('should change the value', () => {
        ResourceLimits.height = ResourceLimits.height - 1n;

        expect(ResourceLimits.height).toBe(33554430n);
    });
});
