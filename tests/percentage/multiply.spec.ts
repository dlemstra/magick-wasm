// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Percentage } from '@src/types/percentage';

describe('MagickGeometry#multiply', () => {
    it('should return the multiplied value', () => {
        const percentage = new Percentage(10);

        expect(percentage.multiply(100)).toBe(10);
    });
});
