/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DoubleMatrix, IDoubleMatrix } from './double-matrix';
import { MagickError } from '../magick-error';

/**
 * Encapsulates a convolution kernel.
 */
export type IConvolveMatrix = IDoubleMatrix;

/**
 * Encapsulates a convolution kernel.
 */
export class ConvolveMatrix extends DoubleMatrix implements IConvolveMatrix {
    /**
     * Initializes a new convolution matrix.
     * @param order The order (odd number).
     * @param values The values to initialize the matrix with.
     */
    constructor(order: number, values?: number[]) {
        super(ConvolveMatrix.validateOrder(order), values);
    }

    private static validateOrder(order: number): number {
        if (order % 2 === 0)
            throw new MagickError('order must be an odd number');

        return order;
    }
}
