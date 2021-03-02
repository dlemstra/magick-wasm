/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "../image-magick";

/** @internal */
export class StringInfo {
    static toArray(instance: number): Uint8Array | null {
        if (instance === 0)
            return null;

        const datum = ImageMagick._api._StringInfo_Datum_Get(instance);
        const length = ImageMagick._api._StringInfo_Length_Get(instance);

        return ImageMagick._api.HEAPU8.subarray(datum, datum + length);
    }
}