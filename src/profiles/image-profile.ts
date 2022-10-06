// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

export interface IImageProfile {
    readonly name: string;
    getData(): Uint8Array;
}

export class ImageProfile implements IImageProfile {
    readonly name: string;

    private _data: Uint8Array;

    constructor(name: string, data: Uint8Array) {
        this.name = name;
        this._data = data;
    }

    getData(): Uint8Array {
        return this._data;
    }
}
