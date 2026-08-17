/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../image-magick';
import { NativePointer } from '@dlemstra/magick-native';


export class OffsetInfo {
    static _use<TReturnType>(x: number, y: number, func: (primaryInfoPtr: NativePointer) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        let instance = ImageMagick._api._NullPointer;
        try {
            instance = ImageMagick._api._OffsetInfo_Create();
            ImageMagick._api._PrimaryInfo_X_Set(instance, x);
            ImageMagick._api._PrimaryInfo_Y_Set(instance, y);
            return func(instance);
        } finally {
            ImageMagick._api._free(Number(instance));
        }
    }
}
