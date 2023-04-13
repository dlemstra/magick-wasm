// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from "./image-magick";

export class PrimaryInfo {
    private _x : number;
    private _y : number;
    private _z : number;

    constructor(x: number, y: number, z:number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x(): number { return this._x; }
    get y(): number { return this._y; }
    get z(): number { return this._z; }

    /** @internal */
    static _create(instance: number): PrimaryInfo {
        if (instance === 0)
            return new PrimaryInfo(0, 0, 0);

        return new PrimaryInfo(
            ImageMagick._api._PrimaryInfo_X_Get(instance),
            ImageMagick._api._PrimaryInfo_Y_Get(instance),
            ImageMagick._api._PrimaryInfo_Z_Get(instance));
    }

    /** @internal */
    _use(func: (primaryInfoPtr: number) => void): void {
        let instance = 0;
        try {
            instance = ImageMagick._api._PrimaryInfo_Create();
            ImageMagick._api._PrimaryInfo_X_Set(instance, this._x);
            ImageMagick._api._PrimaryInfo_Y_Set(instance, this._y);
            ImageMagick._api._PrimaryInfo_Z_Set(instance, this._z);
            func(instance);
        } finally {
            ImageMagick._api._free(instance);
        }
    }
}
