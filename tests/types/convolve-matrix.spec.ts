/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ConvolveMatrix, IConvolveMatrix } from '@src/types/convolve-matrix';
import { DoubleMatrix } from '@src/types/double-matrix';

describe('ConvolveMatrix', () => {
    it('should initialize an odd-order matrix with zero values', () => {
        const matrix: IConvolveMatrix = new ConvolveMatrix(7);

        expect(matrix).toBeInstanceOf(DoubleMatrix);
        expect(matrix.order).toBe(7);
        expect(matrix.toArray()).toEqual(new Array<number>(49).fill(0));
    });

    it('should initialize and update matrix values', () => {
        const values = [0, 1, 0, 1, -4, 1, 0, 1, 0];
        const matrix = new ConvolveMatrix(3, values);
        values[4] = 0;

        expect(matrix.getValue(1, 1)).toBe(-4);
        matrix.setRow(0, [1, 2, 3]);
        matrix.setColumn(2, [4, 5, 6]);
        matrix.setValue(0, 2, 7);

        expect(matrix.toArray()).toEqual([1, 2, 4, 1, -4, 5, 7, 1, 6]);
    });

    it.each([0, 2, 4, -1, 1.5, NaN, Infinity])('should reject invalid order %s', order => {
        expect(() => new ConvolveMatrix(order)).toThrow();
    });

    it('should reject an incorrect number of values', () => {
        expect(() => new ConvolveMatrix(3, [1, 2, 3])).toThrow();
    });
});
