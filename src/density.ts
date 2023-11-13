// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DensityUnit } from './enums/density-unit';

export class Density {
    constructor(xy: number);
    constructor(xy: number, unit: DensityUnit);
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

    readonly x: number;
    readonly y: number;
    readonly units: DensityUnit;
}
