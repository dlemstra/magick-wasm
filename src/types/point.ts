/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../image-magick';

/**
 * Class for a point with doubles.
 */
export class Point {
    /**
     * Initializes a new instance of the {@link Point} class.
     * @param xy The x and y.
     */
    constructor(xy: number);
    /**
     * Initializes a new instance of the {@link Point} class.
     * @param x The x.
     * @param y The y.
     */
    constructor(x: number, y: number);
    constructor(x: number, y?: number) {
        this.x = x;
        this.y = y ?? x;
    }

    /**
     * Gets the x-coordinate of this point.
     */
    readonly x: number;

    /**
     * Gets the y-coordinate of this point.
     */
    readonly y: number;

    /** @internal */
    static _create(instance: number): Point {
        if (instance === 0)
            return new Point(0, 0);

        return new Point(ImageMagick._api._PointInfo_X_Get(instance), ImageMagick._api._PointInfo_Y_Get(instance));
    }
}
