/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { Percentage } from '../../src/percentage';

describe('MagickGeometry#multiply', () => {
    it('should return the multiplied value', () => {
        const percentage = new Percentage(10);

        expect(percentage.multiply(100)).toBe(10);
    });
});