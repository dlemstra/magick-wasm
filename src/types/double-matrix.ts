/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickError } from '../magick-error';
import { ImageMagick } from '../image-magick';
import { NativePointer } from '@dlemstra/magick-native';
import { _castToSize } from '../internal/native/size';
import { _withDoubleArray } from '../internal/native/array';

/**
 * Encapsulates a matrix of doubles.
 */
export interface IDoubleMatrix {
    /**
     * Gets the order of the matrix.
     */
    readonly order: number;

    /**
     * Gets the value at the specified x/y position.
     * @param x The x position.
     * @param y The y position.
     */
    getValue(x: number, y: number): number;

    /**
     * Sets the column at the specified x position.
     * @param x The x position.
     * @param values The values.
     */
    setColumn(x: number, values: number[]): void;

    /**
     * Sets the row at the specified y position.
     * @param y The y position.
     * @param values The values.
     */
    setRow(y: number, values: number[]): void;

    /**
     * Sets the value at the specified x/y position.
     * @param x The x position.
     * @param y The y position.
     * @param value The value.
     */
    setValue(x: number, y: number, value: number): void;

    /**
     * Returns the values of the matrix.
     */
    toArray(): number[];
}

/**
 * Encapsulates a matrix of doubles.
 */
export abstract class DoubleMatrix implements IDoubleMatrix {
    private readonly _values: number[];

    /**
     * Initializes a new matrix.
     * @param order The order.
     * @param values The values to initialize the matrix with.
     */
    protected constructor(readonly order: number, values?: number[]) {
        if (!Number.isInteger(order) || order < 1)
            throw new MagickError('invalid order specified, value has to be at least 1');

        if (values !== undefined && values.length !== order * order)
            throw new MagickError('invalid number of values specified');

        this._values = values === undefined ? new Array<number>(order * order).fill(0) : [...values];
    }

    /**
     * Gets the value at the specified x/y position.
     * @param x The x position.
     * @param y The y position.
     */
    getValue(x: number, y: number): number {
        return this._values[this.getIndex(x, y)];
    }

    /**
     * Sets the column at the specified x position.
     * @param x The x position.
     * @param values The values.
     */
    setColumn(x: number, values: number[]): void {
        this.getIndex(x, 0);
        if (values.length !== this.order)
            throw new MagickError('invalid length');

        for (let y = 0; y < this.order; y++)
            this.setValue(x, y, values[y]);
    }

    /**
     * Sets the row at the specified y position.
     * @param y The y position.
     * @param values The values.
     */
    setRow(y: number, values: number[]): void {
        this.getIndex(0, y);
        if (values.length !== this.order)
            throw new MagickError('invalid length');

        for (let x = 0; x < this.order; x++)
            this.setValue(x, y, values[x]);
    }

    /**
     * Sets the value at the specified x/y position.
     * @param x The x position.
     * @param y The y position.
     * @param value The value.
     */
    setValue(x: number, y: number, value: number): void {
        this._values[this.getIndex(x, y)] = value;
    }

    /**
     * Returns the values of the matrix.
     */
    toArray(): number[] {
        return [...this._values];
    }

    /** @internal */
    static _use<TReturnType>(matrix: IDoubleMatrix, func: (instance: NativePointer) => TReturnType): TReturnType {
        return _withDoubleArray(matrix.toArray(), values => {
            const instance = ImageMagick._api._DoubleMatrix_Create(values, _castToSize(matrix.order));
            if (instance === ImageMagick._api._NullPointer)
                throw new MagickError('unable to allocate memory');

            try {
                return func(instance);
            } finally {
                ImageMagick._api._DoubleMatrix_Dispose(instance);
            }
        });
    }

    private getIndex(x: number, y: number): number {
        if (!Number.isInteger(x) || x < 0 || x >= this.order)
            throw new MagickError('x is out of range');
        if (!Number.isInteger(y) || y < 0 || y >= this.order)
            throw new MagickError('y is out of range');

        return (y * this.order) + x;
    }
}
