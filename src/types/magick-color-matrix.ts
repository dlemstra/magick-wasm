/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickError } from '../magick-error';
import { DoubleMatrix, IDoubleMatrix } from './double-matrix';

/**
 * Encapsulates a color matrix in the order of 1 to 6 (1x1 through 6x6).
 */
export type IMagickColorMatrix = IDoubleMatrix;

/**
 * Encapsulates a color matrix in the order of 1 to 6 (1x1 through 6x6).
 */
export class MagickColorMatrix extends DoubleMatrix implements IMagickColorMatrix {
    /**
     * Initializes a new color matrix.
     * @param order The order (1 to 6).
     * @param values The values to initialize the matrix with.
     */
    constructor(order: number, values?: number[]) {
        super(MagickColorMatrix.validateOrder(order), values);
    }

    private static validateOrder(order: number): number {
        if (!Number.isInteger(order) || order < 1 || order > 6)
            throw new MagickError('invalid order specified, range 1-6');

        return order;
    }
}
