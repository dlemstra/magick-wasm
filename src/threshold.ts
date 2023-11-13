// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Represents a threshold with a minimum and (optional) maximum value.
 */
export class Threshold {
    private readonly _minimum: number;
    private readonly _maximum: number;

    /**
     * Initializes a new instance of the Threshold class.
     * @param minimum - The minimum value of the threshold.
     * @param maximum - The maximum value of the threshold (or 0 if no maximum).
     */
    constructor(minimum: number, maximum: number = 0) {
        this._minimum = minimum;
        this._maximum = maximum;
     }

    /**
     * Convert the threshold to a string.
     */
    toString(): string {
        if (this._maximum === 0) {
            return this._minimum.toString();
        } else {
            return `${this._minimum}-${this._maximum}`;
        }
    }
}
