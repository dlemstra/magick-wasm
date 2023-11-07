// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Represents a threshold with a minimum and (optional) maximum value.
 */
export class Threshold {
    constructor(
        /** The minimum value of the threshold. */
        readonly minimum: number,
        /** The maximum value of the threshold (or 0 if no maximum). */
        readonly maximum: number = 0,
    ) {}

    /**
     * Convert the threshold to a string.
     */
    toString(): string {
        if (this.maximum === 0) {
            return this.minimum.toString();
        } else {
            return `${this.minimum}-${this.maximum}`;
        }
    }
}
