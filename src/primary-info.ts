// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';

export class PrimaryInfo {
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    readonly x;
    readonly y;
    readonly z;

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
            ImageMagick._api._PrimaryInfo_X_Set(instance, this.x);
            ImageMagick._api._PrimaryInfo_Y_Set(instance, this.y);
            ImageMagick._api._PrimaryInfo_Z_Set(instance, this.z);
            func(instance);
        } finally {
            ImageMagick._api._free(instance);
        }
    }
}
