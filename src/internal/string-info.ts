/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../image-magick';
import { NativePointer } from '@dlemstra/magick-native';

/** @internal */
export class StringInfo {
    static toArray(instance: NativePointer): Uint8Array | null {
        if (instance === ImageMagick._api._NullPointer)
            return null;

        const datum = Number(ImageMagick._api._StringInfo_Datum_Get(instance));
        const length = Number(ImageMagick._api._StringInfo_Length_Get(instance));

        return ImageMagick._api.HEAPU8.subarray(datum, datum + length);
    }
}
