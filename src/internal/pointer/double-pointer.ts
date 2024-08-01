// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../image-magick';

/** @internal */
export class DoublePointer {
    private readonly instance: number;

    private constructor() {
        this.instance = ImageMagick._api._malloc(8);
        ImageMagick._api.setValue(this.instance, 0, 'double');
    }

    get ptr(): number { return this.instance; }

    get value(): number { return ImageMagick._api.getValue(this.instance, 'double'); }

    static use<TReturnType>(func: (pointer: DoublePointer) => TReturnType): TReturnType {
        const pointer = new DoublePointer();
        try {
            return func(pointer);
        } finally {
            ImageMagick._api._free(pointer.instance);
        }
    }
}
