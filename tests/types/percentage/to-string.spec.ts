/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';

describe('Percentage#toString', () => {
    it('should remove trailing zeros', () => {
        const percentage = new Percentage(4.000000);
        expect(percentage.toString()).toBe('4%');
    });

    it('should only use two numbers of the fractional part', () => {
        const percentage = new Percentage(4.125);
        expect(percentage.toString()).toBe('4.13%');
    });
});
