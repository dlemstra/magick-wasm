/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DensityUnit } from '../enums/density-unit';

/**
 * Represents the density of an image.
 */
export class Density {
    /**
     *Initializes a new instance of the {@link Density} class with the density set to inches.
     * @param xy The x and y.
     */
    constructor(xy: number);
    /**
     * Initializes a new instance of the {@link Density} class.
     * @param xy The x and y.
     * @param units The units.
     */
    constructor(xy: number, unit: DensityUnit);
    /**
     * Initializes a new instance of the {@link Density} class.
     * @param x The x.
     * @param y The y.
     * @param units The units.
     */
    constructor(x: number, y: number, units: DensityUnit);
    constructor(xyOrXOrValue: number, unitsOrNumber?: DensityUnit | number, units?: DensityUnit) {
        if (unitsOrNumber === undefined) {
            this.x = xyOrXOrValue;
            this.y = xyOrXOrValue;
            this.units = DensityUnit.PixelsPerInch;
        } else if (units !== undefined) {
            this.x = xyOrXOrValue;
            this.y = unitsOrNumber;
            this.units = units;
        } else {
            this.x = xyOrXOrValue;
            this.y = xyOrXOrValue;
            this.units = unitsOrNumber;
        }
    }

    /**
     * Gets the x resolution.
     */
    readonly x: number;

    /**
     * Gets the y resolution.
     */
    readonly y: number;

    /**
     * Gets the units.
     */
    readonly units: DensityUnit;

    /**
     * Returns a string that represents the current {@link Density} object.
     */
    toString(units?: DensityUnit): string {
        if (units == this.units || units === DensityUnit.Undefined || units === undefined)
            return Density.toString(this.x, this.y, units ?? DensityUnit.Undefined);
        else if (this.units == DensityUnit.PixelsPerCentimeter && units == DensityUnit.PixelsPerInch)
            return Density.toString(this.x * 2.54, this.y * 2.54, units);
        else
            return Density.toString(this.x / 2.54, this.y / 2.54, units);
    }

    private static toString(x: number, y: number, units: DensityUnit): string {
        let result = `${x}x${y}`;
        switch (units) {
            case DensityUnit.PixelsPerCentimeter:
                result += 'cm';
                break;
            case DensityUnit.PixelsPerInch:
                result += 'inch';
                break;
        }

        return result;
    }
}
