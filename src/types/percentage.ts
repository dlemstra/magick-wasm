/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Quantum } from '../quantum';

/**
 * Represents a percentage value.
 */
export class Percentage {
    private _value: number;

    /**
     * Initializes a new instance of the {@link Percentage} class.
     * @param value -The value (0% = 0.0, 100% = 100.0)
     */
    constructor(value: number) {
        this._value = value;
    }

    /** @internal */
    static _fromQuantum(value: number): Percentage {
        return new Percentage((value / Quantum.max) * 100);
    }

    /**
     * ultiplies the value by the specified percentage.
     * @param value The value to use.
     * @returns The new value.
     */
    multiply(value: number): number {
        return (value * this._value) / 100.0;
    }

    /**
     * Returns a double that represents the current percentage.
     * @returns A double that represents the current percentage.
     */
    toDouble(): number {
        return this._value;
    }

    /** @internal */
    _toQuantum(): number {
        return Quantum.max * (this._value / 100);
    }
}
