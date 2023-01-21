// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDisposable } from '../disposable';
import { ImageMagick } from '../image-magick';

/** @internal */
export class DisposableArray<TReturnType> implements IDisposable {
    private _pointer: number;
    private readonly _bytes?: Uint8Array;
    private readonly _func: (data: Uint8Array) => TReturnType | Promise<TReturnType>;

    constructor(pointer: number, length: number, func: (data: Uint8Array) => TReturnType | Promise<TReturnType>) {
        this._pointer = pointer;
        this._func = func;
        this._bytes = ImageMagick._api.HEAPU8.subarray(pointer, pointer + length);
    }

    func(array : DisposableArray<TReturnType>): TReturnType | Promise<TReturnType>  {
        if (array._bytes === undefined)
            return array._func(new Uint8Array());
        else
           return array._func(array._bytes);
    }

    dispose(): void {
        this._pointer = ImageMagick._api._MagickMemory_Relinquish(this._pointer);
    }
}
