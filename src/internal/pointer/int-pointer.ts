// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../image-magick';
import { Pointer } from './pointer';

/** @internal */
export class IntPointer extends Pointer {
    private constructor() {
        super(4, 'i32');
    }

    static use<TReturnType>(func: (pointer: IntPointer) => TReturnType): TReturnType {
        const pointer = new IntPointer();
        try {
            return func(pointer);
        } finally {
            ImageMagick._api._free(pointer.ptr);
        }
    }
}
