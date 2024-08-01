// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../image-magick';

/** @internal */
export class IntPointer {
    private readonly instance: number;

    private constructor() {
        this.instance = ImageMagick._api._malloc(4);
        ImageMagick._api.setValue(this.instance, 0, 'i32');
    }

    get ptr(): number { return this.instance; }

    get value(): number { return ImageMagick._api.getValue(this.instance, 'i32'); }

    static use<TReturnType>(func: (pointer: IntPointer) => TReturnType): TReturnType {
        const pointer = new IntPointer();
        try {
            return func(pointer);
        } finally {
            ImageMagick._api._free(pointer.instance);
        }
    }
}
