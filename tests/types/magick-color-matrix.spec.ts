/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColorMatrix } from '@src/types/magick-color-matrix';
import { DoubleMatrix, IDoubleMatrix } from '@src/types/double-matrix';

describe('MagickColorMatrix', () => {
    it('should initialize and expose matrix values in row-major order', () => {
        const matrix = new MagickColorMatrix(2, [1, 2, 3, 4]);

        expect(matrix.order).toBe(2);
        expect(matrix.getValue(0, 0)).toBe(1);
        expect(matrix.getValue(1, 0)).toBe(2);
        expect(matrix.getValue(0, 1)).toBe(3);
        expect(matrix.getValue(1, 1)).toBe(4);
        expect(matrix.toArray()).toEqual([1, 2, 3, 4]);
    });

    it('should implement the double matrix interface', () => {
        const matrix: IDoubleMatrix = new MagickColorMatrix(2);
        matrix.setValue(1, 0, 2);

        expect(matrix).toBeInstanceOf(DoubleMatrix);
        expect(matrix.order).toBe(2);
        expect(matrix.toArray()).toEqual([0, 2, 0, 0]);
    });

    it('should set matrix rows and columns', () => {
        const matrix = new MagickColorMatrix(2);
        matrix.setRow(0, [1, 2]);
        matrix.setColumn(1, [3, 4]);

        expect(matrix.toArray()).toEqual([1, 3, 0, 4]);
    });

    it('should reject invalid matrix dimensions and indexes', () => {
        expect(() => new MagickColorMatrix(0)).toThrow();
        expect(() => new MagickColorMatrix(7)).toThrow();
        expect(() => new MagickColorMatrix(2, [1, 2])).toThrow();
        expect(() => new MagickColorMatrix(2).getValue(2, 0)).toThrow();
        expect(() => new MagickColorMatrix(2).setRow(0, [1])).toThrow();
    });
});
