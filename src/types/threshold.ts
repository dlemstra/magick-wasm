// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Represents a threshold with a minimum and (optional) maximum value.
 */
export class Threshold {
    /**
     * Initializes a new instance of the {@link Threshold} class.
     * @param minimum - The minimum value of the threshold.
     * @param maximum - The maximum value of the threshold (or 0 if no maximum).
     */
    constructor(minimum: number, maximum: number = 0) {
        this.minimum = minimum;
        this.maximum = maximum;
     }

     /**
      * Gets the minimum of this threshold.
      */
     readonly minimum: number;

    /**
    * Gets the maximum of this threshold.
    */
     readonly maximum: number;

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
