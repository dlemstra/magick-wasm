/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Pointer } from './pointer';

/** @internal */
export class NativePointerPointer extends Pointer {
    private constructor() {
        super(4, 'i32');
    }

    static use<TReturnType>(func: (pointer: NativePointerPointer) => TReturnType): TReturnType {
        const pointer = new NativePointerPointer();
        try {
            return func(pointer);
        } finally {
            pointer.free();
        }
    }
}
