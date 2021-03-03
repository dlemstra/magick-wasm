// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { Quantum } from "./quantum";

export class Percentage {
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    multiply(value: number): number {
        return (value * this._value) / 100.0;
    }

    toDouble(): number {
        return this._value;
    }

    toQuantum(): number {
        return Quantum.max * (this._value / 100);
    }
}