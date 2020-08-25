/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { Quantum } from "./quantum";

export class Percentage {
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    multiply(value: number) {
        return (value * this._value) / 100.0;
    }

    toQuantum(): number {
        return Quantum.max * (this._value / 100);
    }
}