/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from "./drawables";
import { IPath } from "./path";
import { PathLineToAbs } from "./paths/path-line-to-abs";
import { PathLineToRel } from "./paths/path-line-to-rel";
import { PathMoveToAbs } from "./paths/path-move-to-abs";
import { PathMoveToRel } from "./paths/path-move-to-rel";

/**
 * Class that can be used to chain path actions.
 */
export class Paths {
    private readonly _drawables?: Drawables;
    private readonly _paths: IPath[] = [];

    /**
     * Initializes a new instance of the {@link Paths} class.
     */
    constructor(drawables?: Drawables) {
        this._drawables = drawables;
    }

    /**
     * Converts this instance to a {@link Drawables} instance.
     */
    drawables(): Drawables {
        if (this._drawables === undefined)
            return new Drawables().path(this._paths);

        return this._drawables.path(this._paths);
    }

    /**
     * Adds a {@link PathLineToAbs} to the paths.
     * @param x The X coordinate.
     * @param y The Y coordinate.
     */
    lineToAbs(x: number, y: number): Paths {
        this._paths.push(new PathLineToAbs(x, y));
        return this;
    }

    /**
     * Adds a {@link PathLineToRel} to the paths.
     * @param x The X coordinate.
     * @param y The Y coordinate.
     */
    lineToRel(x: number, y: number): Paths {
        this._paths.push(new PathLineToRel(x, y));
        return this;
    }

    /**
     * Adds a {@link PathMoveToAbs} to the paths.
     * @param x The X coordinate.
     * @param y The Y coordinate.
     */
    moveToAbs(x: number, y: number): Paths {
        this._paths.push(new PathMoveToAbs(x, y));
        return this;
    }

    /**
     * Adds a {@link PathMoveToRel} to the paths.
     * @param x The X coordinate.
     * @param y The Y coordinate.
     */
    moveToRel(x: number, y: number): Paths {
        this._paths.push(new PathMoveToRel(x, y));
        return this;
    }
}
