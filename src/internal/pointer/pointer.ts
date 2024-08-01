// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../image-magick';

/** @internal */
export abstract class Pointer {
    private readonly instance: number;
    private readonly type: string;

    protected constructor(size: number, type: string) {
        this.instance = ImageMagick._api._malloc(size);
        this.type = type;
        ImageMagick._api.setValue(this.instance, 0, this.type);
    }

    get ptr(): number { return this.instance; }

    get value(): number { return ImageMagick._api.getValue(this.instance, this.type); }
}
