// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../image-magick';
import { Pointer } from './pointer';

/** @internal */
export class DoublePointer extends Pointer {
    private constructor() {
        super(8, 'double');
    }

    static use<TReturnType>(func: (pointer: DoublePointer) => TReturnType): TReturnType {
        const pointer = new DoublePointer();
        try {
            return func(pointer);
        } finally {
            ImageMagick._api._free(pointer.ptr);
        }
    }
}
