/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../image-magick';

export class OffsetInfo {
    static _use<TReturnType>(x: number, y: number, func: (primaryInfoPtr: number) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        let instance = 0;
        try {
            instance = ImageMagick._api._OffsetInfo_Create();
            ImageMagick._api._PrimaryInfo_X_Set(instance, x);
            ImageMagick._api._PrimaryInfo_Y_Set(instance, y);
            return func(instance);
        } finally {
            ImageMagick._api._free(instance);
        }
    }
}
