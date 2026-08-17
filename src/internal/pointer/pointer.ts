/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../../image-magick';
import { NativePointer } from '@dlemstra/magick-native';

/** @internal */
export abstract class Pointer {
    private readonly instance: number;
    private readonly type: string;

    protected constructor(size: number, type: string) {
        this.instance = ImageMagick._api._malloc(size);
        this.type = type;
        ImageMagick._api.setValue(this.instance, 0, this.type);
    }

    protected free(): void {
        ImageMagick._api._free(this.instance);
    }

    get ptr(): NativePointer { return ImageMagick._api._CastToSize(this.instance); }

    get value(): NativePointer { return ImageMagick._api._CastToSize(ImageMagick._api.getValue(this.instance, this.type)); }
}
